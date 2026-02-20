---
title: "How the Course Map Works"
lessonId: "intro-course-map"
xp: 15
weight: 2
icon: "🗺️"
description: "Understand the Duolingo-style learning path and how progress is tracked."
---

## Your Learning Path

The **Course Map** is the heart of MaiMi. Think of it like a Duolingo tree — a winding path of lesson nodes you work through one by one.

| Icon style | Meaning |
|---|---|
| ⬜ Gray icon | Not yet completed |
| 🟡 Gold icon with ✓ | Completed |

## How It Updates

After you click **Finish Lesson** on any page:

1. The lesson data is written to `localStorage`
2. The next time you visit the Course Map, JavaScript reads `localStorage` and applies the gold style to that node

No page rebuild needed. No server. Just your browser.

## Adding New Lessons

1. Create a new `.md` file in `content/courses/`
2. Set the front matter: `lessonId`, `xp`, `weight`, `icon`
3. Write your content in Markdown
4. Commit and push — GitHub Actions rebuilds the site automatically

```yaml
---
title: "My New Lesson"
lessonId: "my-new-lesson"
xp: 20
weight: 5
icon: "🚀"
---
```

---

## Tip: Use Weight to Order Lessons

The `weight` field controls the order lessons appear in the map. Lower numbers come first.

---

You're making great progress! Keep scrolling to finish this lesson.
