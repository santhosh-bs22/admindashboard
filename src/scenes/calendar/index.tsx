import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import Header from '../../components/Header';
import { Card, CardContent } from '../../components/ui/card';

const Calendar: React.FC = () => {
  const [events, setEvents] = useState([
    { title: 'Quarterly Review', date: '2024-03-15', backgroundColor: '#3b82f6' },
    { title: 'Client Meeting: TCS', date: '2024-03-18', backgroundColor: '#10b981' },
    { title: 'Project Deadline', date: '2024-03-22', backgroundColor: '#ef4444' },
    { title: 'Team Outing', date: '2024-03-25', backgroundColor: '#f59e0b' },
  ]);

  const handleDateClick = (arg: any) => {
    const title = prompt('Enter event title:');
    if (title) {
      setEvents([...events, { title, date: arg.dateStr, backgroundColor: '#6366f1' }]);
    }
  };

  return (
    <div className="space-y-6">
      <Header title="Calendar" subtitle="Manage your schedule and events" />
      
      <Card>
        <CardContent className="p-6">
          <div className="calendar-wrapper">
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              weekends={true}
              events={events}
              dateClick={handleDateClick}
              height="75vh"
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,dayGridWeek,dayGridDay'
              }}
              themeSystem="standard"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Calendar;