import AddItemForm from './AddItemForm.jsx'
import { STATUS_LABELS, currency, getSetTotal } from '../utils/format.js'
import './SetCard.css'

// קומפוננטה "טיפשה" — מציגה את נתוני המארז ומדווחת להורה על אירועים
function SetCard({ set, onStart, onRemoveItem, onAddItem, onClose }) {
  // האם המארז ריק (אמת/שקר) — לשימוש בכל התניות למטה
  const isEmpty = set.status === 'empty'
  // חישוב סך המחיר של הפריטים במארז
  const total = getSetTotal(set.items)

  // אלמנט המארז עצמו (article = יחידה עצמאית של תוכן)
  return (
    // מחלקה דינמית לפי הסטטוס — צבע פס שונה לכל מצב
    <article className={`card ${isEmpty ? 'card--empty' : 'card--building'}`}>
      {/* כותרת הכרטיס: שם המארז + תג סטטוס */}
      <header className="card__header">
        {/* שם המארז / היעד */}
        <h2 className="card__title">{set.destination}</h2>
        {/* תג צבעוני שמציג את הסטטוס במילים */}
        <span className={`badge badge--${set.status}`}>
          {STATUS_LABELS[set.status]}
        </span>
      </header>

      {/* תצוגה מותנית: ריק → כפתור התחלה; בהרכבה → כל ממשק העריכה */}
      {isEmpty ? (
        <button
          className="btn btn--primary btn--full"
          onClick={() => onStart(set.id)}
        >
          התחל להרכיב מארז
        </button>
      ) : (
        // שבר ריאקט — מאפשר להחזיר מספר אלמנטים בלי עטיפה נוספת
        <>
          {/* אם יש פריטים — מציג רשימה; אחרת הודעת ריק */}
          {set.items.length > 0 ? (
            <ul className="card__items">
              {set.items.map((item) => (
                // שורה עבור פריט בודד; key חייב להיות ייחודי לזיהוי
                <li key={item.id} className="card__item">
                  <span className="card__item-name">{item.name}</span>
                  <span className="card__item-price">
                    {currency.format(item.price)}
                  </span>
                  {/* כפתור X למחיקת הפריט הזה מהמארז */}
                  <button
                    className="btn-x"
                    aria-label={`הסר את ${item.name}`}
                    title="הסר פריט"
                    onClick={() => onRemoveItem(set.id, item.id)}
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="card__empty-msg">אין פריטים במארז עדיין</p>
          )}

          {/* שורת "סך הכל" בתחתית הרשימה */}
          <div className="card__total">
            <span>סך הכל</span>
            <strong>{currency.format(total)}</strong>
          </div>

          {/* טופס הוספת פריט — ההוספה עוברת דרך ההורה עם מזהה המארז */}
          <AddItemForm onAdd={(item) => onAddItem(set.id, item)} />

          {/* כפתור סיום ההרכבה */}
          <button
            className="btn btn--success btn--full"
            onClick={() => onClose(set.id)}
          >
            סגור ושלח מארז
          </button>
        </>
      )}
    </article>
  )
}

export default SetCard
