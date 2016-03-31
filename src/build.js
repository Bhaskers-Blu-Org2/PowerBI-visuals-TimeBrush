module.exports = {
    "version": {
        "major": "0",
        "minor": "9",
        "patch": "7"
    },
    "output": {
        "PowerBI": {
            "visualName": "TimeBrush",
            "displayName": "Time Brush",
            "projectId": "1450434005853",
            "icon": "icon.svg",
            "screenshot": "screenshot.png",
            "thumbnail": "thumbnail.png",
            "entry": "TimeBrushVisual",
            "description": "This visual is currently in beta testing and is undergoing active development. Time Brush lets you filter a time-based dataset by directly dragging or brushing over a time period of interest. The initial display is a helpful overview that shows the frequency of items in each pre-defined time bucket (e.g., hours, days, years) as a vertical bar chart. Whenever you select a time period, any linked visuals are automatically filtered to display only those records with time attributes in the selected period."
        },
        "component": {
            "entry": "TimeBrush"
        },
        "react": {
            "entry": "TimeBrushReact"
        }
    },
    "lintFiles": [
        "TimeBrush.ts"
    ]
};