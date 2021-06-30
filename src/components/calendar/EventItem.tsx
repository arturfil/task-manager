import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteUserEvent, updateUserEvent, UserEvent } from '../../redux/userEvents'

interface Props {
  event: UserEvent
}

const EventItem: React.FC<Props> = ({ event }) => {
  const dispatch = useDispatch();
  const [editable, setEditable] = useState(false);
  const [title, setTitle] = useState(event.title);

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (editable) {
      inputRef.current?.focus();
    }
  }, [editable])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }

  const handleDeleteClick = () => {
    dispatch(deleteUserEvent(event.id));
  }

  const handleTitleClick = () => {
    setEditable(true);
  }

  const handleBlur = () => {
    if (title !== event.title) {
      dispatch(updateUserEvent({
        ...event,
        title
      })) 
    }
    setEditable(false);
  } 
  
  return (
    <div className="calendar-event">
      <div className="calendar-event-info">
        <div className="calendar-event-time">10:00 - 12:00</div>
        <div className="calendar-event-title">
          {editable ? (
            <input type="text" ref={inputRef} 
              onBlur={handleBlur}
              value={title}
              onChange={handleChange} />
          ) : (
            <span onClick={handleTitleClick}>
              {event.title}
            </span>
          )}
        </div>
      </div>
      <button
        onClick={handleDeleteClick}
        className="calendar-event-delete-button">
        &times;
      </button>
    </div>
  )
}

export default EventItem
