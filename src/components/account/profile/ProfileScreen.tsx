"use client";

import React from "react";
import StudentProfileCard from "./StudentProfileCard";
import StudentQuickActions from "./StudentQuickActions";

import MonthlyScheduleCalendar, {
  CalendarDayData,
  ScheduleMode,
} from "./MonthlyScheduleCalendar";

import SchedulePanel from "./SchedulePanel";

const STUDENT_DATA = {
  fullName: "Nguyễn Tấn Phát",
  phone: "0369809077",
  email: "nguyentanphat100102it@gmail.com",
  address: "Tây Ninh",
  identityCard: "070202000000",
  avatarUrl: "/image/avatar.png",
  gender: "Nam" as const,
  birthday: "10/01/2002",
  course: "B2 - K202 (2025)",
};

const DAY_MAP: Record<string, CalendarDayData> = {
  "2025-12-09": {
    dateISO: "2025-12-09",
    status: "HAS_CLASS",
    events: [
      {
        id: 1,
        title: "Lý thuyết: Luật giao thông",
        time: "18:30 - 20:30",
        room: "P101",
        instructor: "GV001 - Giảng viên A",
        mode: "Offline",
      },
    ],
  },
  "2025-12-14": {
    dateISO: "2025-12-14",
    status: "HAS_CLASS",
    events: [
      {
        id: 2,
        title: "Online: Sa hình cơ bản",
        time: "19:00 - 21:00",
        room: "Zoom",
        instructor: "GV001 - Giảng viên A",
        mode: "Online",
      },
    ],
  },
  "2025-12-16": {
    dateISO: "2025-12-16",
    status: "AVAILABLE",
    events: [
      {
        id: 11,
        title: "Thực hành: Đường trường",
        time: "08:00 - 10:00",
        room: "Sân tập",
        instructor: "GV002 - Giảng viên B",
        mode: "Offline",
      },
      {
        id: 12,
        title: "Thực hành: Sa hình",
        time: "10:30 - 12:00",
        room: "Sân tập",
        instructor: "GV003 - Giảng viên C",
        mode: "Offline",
      },
    ],
  },
  "2025-12-18": {
    dateISO: "2025-12-18",
    status: "FULL",
    events: [
      {
        id: 21,
        title: "Thực hành: Sa hình",
        time: "13:30 - 15:00",
        room: "Sân tập",
        instructor: "GV003 - Giảng viên C",
        mode: "Offline",
      },
    ],
  },
};

export default function ProfileScreen() {
  const [openSchedule, setOpenSchedule] = React.useState(false);
  const [mode, setMode] = React.useState<ScheduleMode>("VIEW");

  // ✅ panel state
  const [panelOpen, setPanelOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState<string | null>(null);

  const year = 2025;
  const month = 12;

  const handleOpenCalendar = (m: "REGISTER" | "VIEW") => {
    setMode(m);
    setOpenSchedule(true);
    setPanelOpen(false);
    setSelectedDate(null);
  };

  const openPanelForDate = (dateISO: string) => {
    setSelectedDate(dateISO);
    setPanelOpen(true);
  };

  const onRegister = (eventId: number) => {
    alert(`✅ Đăng ký thành công slot #${eventId} (mock)`);
    setPanelOpen(false);
  };

  return (
    <div className="space-y-6">
      <StudentProfileCard data={STUDENT_DATA} />

      <StudentQuickActions layout="row" onOpenSchedule={handleOpenCalendar} />

      {openSchedule ? (
        <>
          <MonthlyScheduleCalendar
            mode={mode}
            year={year}
            month={month}
            dayMap={DAY_MAP}
            selectedDateISO={selectedDate}
            onOpenPanel={openPanelForDate} // ✅ open panel
          />

          <SchedulePanel
            open={panelOpen}
            onOpenChange={setPanelOpen}
            mode={mode}
            dateISO={selectedDate}
            data={selectedDate ? DAY_MAP[selectedDate] : undefined}
            onRegister={onRegister}
          />
        </>
      ) : null}
    </div>
  );
}
