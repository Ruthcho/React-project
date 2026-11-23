// מיפוי בין קוד הסטטוס לבין התווית שתוצג למשתמש
export const STATUS_LABELS = { empty: 'ריק', building: 'בהרכבה' }

// פורמט להצגת מספר כשקל — נוצר פעם אחת ולא בכל render
export const currency = new Intl.NumberFormat('he-IL', {
  style: 'currency', // הצגה כמטבע
  currency: 'ILS', // שקל ישראלי
  maximumFractionDigits: 0, // בלי אגורות (מספר שלם)
})

// חישוב סך המחיר של כל הפריטים — reduce שמוסיף את מחיר כל פריט
export function getSetTotal(items) {
  // סכום מתחיל ב-0, ובכל איטרציה מוסיף את מחיר הפריט
  return items.reduce((sum, item) => sum + item.price, 0)
}
