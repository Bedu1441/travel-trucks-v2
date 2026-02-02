import { useState } from 'react';
import css from './BookingForm.module.css';

export default function BookingForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    date: '',
    comment: '',
  });

  const [status, setStatus] = useState('idle'); // idle | success

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // MVP: симуляція успіху без POST (API не вимагає)
    setStatus('success');

    // очистка форми
    setForm({ name: '', email: '', date: '', comment: '' });

    // сховати нотифікацію через 3 сек
    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <div className={css.card}>
      <h3 className={css.title}>Book your campervan now</h3>
      <p className={css.subtitle}>
        Stay connected! We are always ready to help you.
      </p>

      {status === 'success' && (
        <div className={css.toast} role="status">
          ✅ Booking request sent successfully!
        </div>
      )}

      <form className={css.form} onSubmit={onSubmit}>
        <input
          className={css.input}
          name="name"
          value={form.name}
          onChange={onChange}
          placeholder="Name"
          required
        />

        <input
          className={css.input}
          type="email"
          name="email"
          value={form.email}
          onChange={onChange}
          placeholder="Email"
          required
        />

        <input
          className={css.input}
          type="date"
          name="date"
          value={form.date}
          onChange={onChange}
          required
        />

        <textarea
          className={css.textarea}
          name="comment"
          value={form.comment}
          onChange={onChange}
          placeholder="Comment"
          rows={4}
        />

        <button className={css.button} type="submit">
          Send
        </button>
      </form>
    </div>
  );
}
