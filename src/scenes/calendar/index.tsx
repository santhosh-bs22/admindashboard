import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import Header from '../../components/Header';

const Calendar: React.FC = () => {
  const [events, setEvents] = useState([
    { title: 'Team Meeting', date: '2024-01-15' },
    { title: 'Client Call', date: '2024-01-18' },
    { title: 'Product Launch', date: '2024-01-22' },
    { title: 'Weekly Review', date: '2024-01-25' },
  ]);

  const handleDateClick = (arg: any) => {
    const title = prompt('Enter event title:');
    if (title) {
      setEvents([...events, { title, date: arg.dateStr }]);
    }
  };

  return (
    <div>
      <Header title="Calendar" subtitle="Manage your schedule" />
      
      <div className="bg-card rounded-xl border p-6">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          weekends={true}
          events={events}
          dateClick={handleDateClick}
          height="auto"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,dayGridWeek,dayGridDay'
          }}
        />
      </div>
    </div>
  );
};

export default Calendar;