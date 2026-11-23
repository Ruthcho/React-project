import { useState } from 'react'
import './AddItemForm.css'

// טופס הוספת פריט — מחזיק State מקומי לשדות, ומדווח להורה רק בשליחה
function AddItemForm({ onAdd }) {
  // מצב מקומי: שם הפריט שהוקלד בשדה — מתחיל ריק
  const [name, setName] = useState('')
  // מצב מקומי: מחיר הפריט (מחרוזת, כי כך מגיע מה-input)
  const [price, setPrice] = useState('')

  // פונקציה שרצה בזמן שליחת הטופס
  function handleSubmit(e) {
    // מונע את רענון הדף שמתבצע אוטומטית בשליחת טופס
    e.preventDefault()
    // מסיר רווחים מיותרים לפני/אחרי השם
    const trimmed = name.trim()
    // המרת המחיר ממחרוזת למספר
    const parsed = Number(price)

    // עוצר אם השם ריק, אין מחיר, המחיר לא מספר, או שלילי
    if (!trimmed || !price || !Number.isFinite(parsed) || parsed < 0) return

    // קורא לפונקציה של ההורה כדי להוסיף את הפריט למארז
    onAdd({ name: trimmed, price: parsed })
    // מאפס את שדה השם אחרי הוספה
    setName('')
    // מאפס את שדה המחיר אחרי הוספה
    setPrice('')
  }

  // מבנה הטופס להוספת פריט
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      {/* שדה טקסט לשם הפריט */}
      <input
        className="add-form__input"
        type="text"
        placeholder="שם הפריט"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      {/* שדה מספרי למחיר הפריט */}
      <input
        className="add-form__input add-form__input--price"
        type="number"
        placeholder="מחיר"
        min="0"
        step="1"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      {/* כפתור השליחה של הטופס */}
      <button className="btn" type="submit">
        הוסף פריט
      </button>
    </form>
  )
}

export default AddItemForm
