# Firebase Security Specification & TDD Spec

## 1. Data Invariants

1. **User Identity Isolation**: A user can only read and write their own public profile `users/{userId}` and private info `users/{userId}/private/info`.
2. **PII Isolation**: The private subcollection `users/{userId}/private/info` is restricted entirely to the specific user. No other user can read or write to it.
3. **Role & Privilege Protection**: No user can set `isAdmin` to `true` or alter administrative fields themselves. Only existing verified administrators (defined in an `admins/{userId}` collection or checked securely) or server-side rules can authorize admin tasks.
4. **Lesson Integrity**: Lessons can only be created, modified, or deleted by verified administrators. Standard users have read-only access to lessons.
5. **Score & XP Integrity**: Experience points (XP), levels, streaks, and badges inside `users/{userId}` can only be updated by the authenticated user owner. Rates of change must be constrained (such as capping increments, or at least preventing modification by other users).

---

## 2. The "Dirty Dozen" Payloads (Designed to Break the Rules)

These payloads must be rejected by `firestore.rules`:

1. **Malicious Profile Write (Identity Spoofing)**: User `attacker_123` tries to write to `users/victim_456` with a profile update.
2. **Malicious Private Read (PII Leak)**: User `attacker_123` tries to read `users/victim_456/private/info`.
3. **Privilege Escalation**: User `normal_user_789` tries to set `"isAdmin": true` in their own private document `users/normal_user_789/private/info`.
4. **Illegal Lesson Creation (Admin Bypass)**: Non-admin `normal_user` tries to create a new lesson in `lessons/malicious_lesson`.
5. **Illegal Lesson Deletion (Admin Bypass)**: Non-admin `normal_user` tries to delete a lesson `lessons/lesson_1`.
6. **Shadow Fields Insertion**: Standard user tries to create a profile containing undocumented/shadow fields like `{ "hacked": true, "superAdmin": true }`.
7. **Negative XP / Score Poisoning**: A user tries to set their experience points to a negative value or an extremely large value (e.g., `-999999` or `999999999`).
8. **Invalid Path Injection (ID Poisoning)**: An attacker tries to write a profile with a 2KB garbage string as the user ID.
9. **Blanket Collection Scrape (Insecure List)**: Anonymous or unauthenticated request trying to list all private user info or list all profiles without standard query constraints.
10. **Admin Spoofing**: An attacker trying to write to the `admins` collection directly to make themselves an admin (`admins/attacker_123`).
11. **Impersonated Author UID**: Writing a public profile where the document ID is `attacker_123` but the `username` field is trying to spoof another user, or another UID is written inside a sub-field.
12. **Tampering with completedLessons list**: Trying to inject non-string items or a massive 10,000 item array into `completedLessons` list to crash the UI or cause database bloat (Denial of Wallet).

---

## 3. Test Cases (TDD Verification)

We will implement strict validation in `firestore.rules` to ensure all malicious cases return `PERMISSION_DENIED`.

* **Case 1**: `request.auth.uid == userId` for reading/writing `users/{userId}`.
* **Case 2**: `request.auth.uid == userId` for private info.
* **Case 3**: `request.resource.data.isAdmin == false` unless the user is already verified as an admin.
* **Case 4**: `allow write: if false` on `/lessons` unless the user exists in `/databases/$(database)/documents/admins/$(request.auth.uid)`.
* **Case 5**: Default catch-all denies everything else.
