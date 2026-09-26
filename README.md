# FitLog — Workout Library 🏋️‍♂️

FitLog is a dark, no-nonsense gym companion app built to help you pick your lifts, lock them into your plan, and track your week's work. 

## 🚀 Technologies Used
- **Next.js (App Router)** - The core React framework for routing, SSR, and API data fetching.
- **Tailwind CSS** - For responsive, utility-first styling.
- **DaisyUI** - Tailwind component library for buttons and badges.
- **React Hot Toast** - For sleek, interactive popup notifications.
- **Local Storage API** - For persisting data seamlessly without a backend.
- **Geist & Oswald Fonts** - For modern, premium typography.

## ✨ Key Features
1. **Dynamic Workout Library**: Automatically fetches and renders workout routines from a centralized API, displaying detailed metrics and gorgeous hero images.
2. **Interactive "My Plan" Manager**: Instantly add up to 5 lifts to your daily agenda or save them for later. Uses a segmented tab interface to toggle views.
3. **Advanced Data Sorting**: Sort your planned or saved workouts dynamically by Duration (ascending), Calories (ascending), or Rating (descending).
4. **Persistent Local State**: Workouts added to your plan or saved list are instantly written to `localStorage`. You can refresh the page and never lose your queue!
5. **Smart Validation & Capping**: Automatically prevents you from adding duplicate exercises and automatically disables the 'Add to plan' button when you reach the daily 5-lift cap.

## ⚙️ How to Run
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result!
