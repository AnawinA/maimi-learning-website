---
title: "Managing Your Progress"
lessonId: "intro-progress"
xp: 20
weight: 3
icon: "💾"
description: "Learn how to export, import, and manage your MaiMi progress data."
---

## Your Progress Lives in Your Browser

MaiMi stores all your data in `localStorage` under the key `user_progress`. Here's what that data looks like:

```json
{
  "intro-welcome": {
    "lessonId": "intro-welcome",
    "title": "Welcome to MaiMi",
    "completed": true,
    "xp": 10,
    "completedAt": "2025-01-15T08:30:00.000Z"
  }
}
```

## Exporting Your Progress

Go to **Settings → Export Progress** to download a `maimi-progress.json` file.

## Importing on Another Device

1. Export from your current browser
2. Open MaiMi on the new device
3. Go to **Settings → Import Progress**
4. Upload the `.json` file
5. Refresh — your progress is restored!

## Your Profile Page

The **Profile** page shows you:

- 🏅 **Total lessons completed**
- ⚡ **Total XP earned**
- 🔥 **Day streak**
- 📊 **Overall course progress %**

---

Congratulations on finishing the intro course! 🎉 Go add your own lessons and start building your knowledge base.
