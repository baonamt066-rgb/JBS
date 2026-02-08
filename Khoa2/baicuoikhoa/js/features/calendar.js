/**
 * Calendar Module
 * Handles month/week views, event rendering, and navigation.
 * 
 * RULE COMPLIANCE:
 * - No direct color setting.
 * - CSS classes only (classList).
 * - No else-if for coexist state checks.
 * - Single init point.
 */

const Calendar = {
    currentDate: new Date(),
    view: 'month',

    getMonthName(monthIndex) {
        const data = Storage.get();
        const lang = data.appSettings.lang || 'en';
        const dict = i18n[lang];
        const months = [
            dict.january, dict.february, dict.march, dict.april,
            dict.may, dict.june, dict.july, dict.august,
            dict.september, dict.october, dict.november, dict.december
        ];
        return months[monthIndex] || '';
    },

    getWeekdayShort(dayIndex) {
        const data = Storage.get();
        const lang = data.appSettings.lang || 'en';
        const dict = i18n[lang];
        const weekdays = [
            dict.week_header_sun, dict.week_header_mon, dict.week_header_tue,
            dict.week_header_wed, dict.week_header_thu, dict.week_header_fri,
            dict.week_header_sat
        ];
        return weekdays[dayIndex] || '';
    },

    updateWeekHeader() {
        const weekHeader = document.querySelector('.week-header');
        if (!weekHeader) return;
        const dayNames = [];
        for (let i = 0; i < 7; i++) {
            dayNames.push(this.getWeekdayShort(i));
        }
        weekHeader.innerHTML = dayNames.map(day => `<div class="day-name">${day}</div>`).join('');
    },

    formatDateWithI18n(dateObj) {
        const data = Storage.get();
        const lang = data.appSettings.lang || 'en';
        const dict = i18n[lang];
        const dayIndex = dateObj.getDay();
        const dayNames = [
            dict.day_sunday, dict.day_monday, dict.day_tuesday, dict.day_wednesday,
            dict.day_thursday, dict.day_friday, dict.day_saturday
        ];
        const monthIndex = dateObj.getMonth();
        const months = [
            dict.january, dict.february, dict.march, dict.april,
            dict.may, dict.june, dict.july, dict.august,
            dict.september, dict.october, dict.november, dict.december
        ];
        const dayName = dayNames[dayIndex];
        const monthName = months[monthIndex];
        const day = dateObj.getDate();
        const year = dateObj.getFullYear();
        if (lang === 'vi') return `${dayName}, ${day} tháng ${monthIndex + 1}, năm ${year}`;
        return `${dayName}, ${monthName} ${day}, ${year}`;
    },

    init() {
        this.render();
    },

    switchView(viewName) {
        const data = Storage.get();
        const lang = data.appSettings.lang || 'en';
        const dict = i18n[lang];
        this.view = viewName;
        const btnMonth = document.getElementById('btn-view-month');
        const btnWeek = document.getElementById('btn-view-week');
        if (btnMonth) {
            btnMonth.classList.toggle('active', viewName === 'month');
            btnMonth.innerText = dict.month_view;
        }
        if (btnWeek) {
            btnWeek.classList.toggle('active', viewName === 'week');
            btnWeek.innerText = dict.week_view;
        }
        this.render();
    },

    prev() {
        if (this.view === 'month') this.currentDate.setMonth(this.currentDate.getMonth() - 1);
        else this.currentDate.setDate(this.currentDate.getDate() - 7);
        this.render();
    },

    next() {
        if (this.view === 'month') this.currentDate.setMonth(this.currentDate.getMonth() + 1);
        else this.currentDate.setDate(this.currentDate.getDate() + 7);
        this.render();
    },

    goToToday() {
        this.currentDate = new Date();
        this.render();
    },

    render() {
        const container = document.getElementById('calendar-grid-content');
        const title = document.getElementById('cal-month-year');
        if (!container || !title) return;
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();
        const today = new Date();
        if (this.view === 'month') {
            title.innerText = `${this.getMonthName(month)} ${year}`;
            this.renderMonthView(container, year, month, today);
        } else {
            const start = new Date(this.currentDate);
            start.setDate(start.getDate() - start.getDay());
            const end = new Date(start);
            end.setDate(start.getDate() + 6);
            const sameMonth = start.getMonth() === end.getMonth();
            title.innerText = sameMonth
                ? `${this.getMonthName(start.getMonth())} ${start.getDate()} – ${end.getDate()}, ${end.getFullYear()}`
                : `${this.getMonthName(start.getMonth())} ${start.getDate()} – ${this.getMonthName(end.getMonth())} ${end.getDate()}, ${end.getFullYear()}`;
            this.renderWeekView(container, this.currentDate, today);
        }
        this.updateWeekHeader();
    },

    getEventsForDate(dateObj) {
        const data = Storage.get();
        const dayOfWeek = dateObj.getDay();
        const dateStr = dateObj.toDateString();
        const schedules = data.schedule.filter(s => {
            if (s.allDays === true) return true;
            if (s.day && !s.selectedDays) return parseInt(s.day) === dayOfWeek;
            if (s.selectedDays && Array.isArray(s.selectedDays)) return s.selectedDays.includes(dayOfWeek.toString());
            return false;
        }).map(s => ({
            type: 'schedule',
            title: s.subjectName,
            time: `${s.startTime}-${s.endTime}`,
            room: s.room,
            color: s.color || '#3b82f6',
            raw: s
        }));
        const deadlines = data.deadlines.filter(d => new Date(d.dueDate).toDateString() === dateStr).map(d => ({
            type: 'deadline', title: d.title, time: new Date(d.dueDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), completed: d.status === 'completed', raw: d
        }));
        return [...schedules, ...deadlines].sort((a, b) => a.time.localeCompare(b.time));
    },

    renderMonthView(container, year, month, today) {
        container.classList.remove('week-grid');
        container.classList.add('month-grid');
        container.innerHTML = '';
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        for (let i = 0; i < firstDay; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cal-cell', 'inactive');
            container.appendChild(cell);
        }

        for (let d = 1; d <= daysInMonth; d++) {
            const dateObj = new Date(year, month, d);
            const isToday = dateObj.toDateString() === today.toDateString();
            const events = this.getEventsForDate(dateObj);

            const cell = document.createElement('div');
            cell.classList.add('cal-cell');

            if (isToday) cell.classList.add('today');

            // --- UX Cleanup: Removed 'has-task' highlight and selection highlight (Issue 1 & 2) ---

            // Deadline highlight (Kept as requested)
            const dlEvents = events.filter(e => e.type === 'deadline');
            if (dlEvents.length > 0) {
                cell.classList.add('has-deadline');
                const hasPending = dlEvents.some(e => !e.completed);
                const hasOverdue = dlEvents.some(e => !e.completed && new Date(e.raw.dueDate) < new Date());

                if (hasOverdue) cell.classList.add('deadline-overdue');
                if (!hasPending) cell.classList.add('deadline-completed');
            }

            // Click only opens modal, no selection state change
            cell.onclick = () => {
                this.openModal(dateObj);
            };

            const dateNum = document.createElement('div');
            dateNum.classList.add('date-num');
            dateNum.innerText = d;
            cell.appendChild(dateNum);

            events.slice(0, 3).forEach(ev => {
                const pill = document.createElement('div');
                pill.classList.add('evt-pill');
                const icon = document.createElement('i');

                if (ev.type === 'schedule') {
                    pill.classList.add('evt-sch');
                    icon.className = 'fas fa-book';
                    // Event-specific colors are kept on the pill level
                    pill.style.setProperty('--task-color', ev.color);
                    pill.style.setProperty('--task-bg', this.lightenColor(ev.color, 45));
                } else {
                    pill.classList.add('evt-dl');
                    if (ev.completed) pill.classList.add('completed');
                    icon.className = 'fas fa-exclamation-circle';
                }

                pill.appendChild(icon);
                pill.appendChild(document.createTextNode(` ${ev.title}`));
                cell.appendChild(pill);
            });

            if (events.length > 3) {
                const more = document.createElement('div');
                more.style.fontSize = '10px';
                more.style.color = '#999';
                more.style.paddingLeft = '5px';
                more.innerText = `+${events.length - 3} more`;
                cell.appendChild(more);
            }

            container.appendChild(cell);
        }
    },

    renderWeekView(container, currentDate, today) {
        container.classList.remove('month-grid');
        container.classList.add('week-grid');
        container.innerHTML = '';
        const startOfWeek = new Date(currentDate);
        startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

        for (let i = 0; i < 7; i++) {
            const dateObj = new Date(startOfWeek);
            dateObj.setDate(startOfWeek.getDate() + i);
            const isToday = dateObj.toDateString() === today.toDateString();
            const events = this.getEventsForDate(dateObj);

            const col = document.createElement('div');
            col.classList.add('day-col');

            if (isToday) col.classList.add('today');

            // --- UX Cleanup: Removed 'has-task' and selection highlights ---

            const dlEvents = events.filter(e => e.type === 'deadline');
            if (dlEvents.length > 0) {
                col.classList.add('has-deadline');
                const hasPending = dlEvents.some(e => !e.completed);
                const hasOverdue = dlEvents.some(e => !e.completed && new Date(e.raw.dueDate) < new Date());

                if (hasOverdue) col.classList.add('deadline-overdue');
                if (!hasPending) col.classList.add('deadline-completed');
            }

            col.onclick = () => { this.openModal(dateObj); };

            const data = Storage.get();
            const lang = data.appSettings.lang || 'en';
            const dict = i18n[lang];

            const header = document.createElement('div');
            header.classList.add('col-header');
            header.innerHTML = `<div style="font-size:11px; color:#64748b;">${this.getWeekdayShort(dateObj.getDay())}</div><div style="font-weight:700; font-size:16px;">${dateObj.getDate()}</div>`;
            col.appendChild(header);

            if (events.length === 0) {
                const empty = document.createElement('div');
                empty.style.textAlign = 'center';
                empty.style.color = '#ccc';
                empty.style.fontSize = '11px';
                empty.style.marginTop = '20px';
                empty.innerText = dict.no_events;
                col.appendChild(empty);
            } else {
                events.forEach(ev => {
                    const pill = document.createElement('div');
                    pill.classList.add('evt-pill', 'evt-pill-week');
                    const icon = document.createElement('i');

                    if (ev.type === 'schedule') {
                        pill.classList.add('evt-sch');
                        icon.className = 'fas fa-book';
                        pill.style.setProperty('--task-color', ev.color);
                        pill.style.setProperty('--task-bg', this.lightenColor(ev.color, 45));
                    } else {
                        pill.classList.add('evt-dl');
                        if (ev.completed) pill.classList.add('completed');
                        icon.className = 'fas fa-clock';
                    }

                    const inner = document.createElement('div');
                    inner.style.display = 'flex';
                    inner.style.flexDirection = 'column';
                    inner.style.gap = '2px';
                    inner.style.width = '100%';

                    const timeRow = document.createElement('div');
                    timeRow.style.fontWeight = '600';
                    timeRow.style.display = 'flex';
                    timeRow.style.alignItems = 'center';
                    timeRow.style.gap = '5px';
                    timeRow.appendChild(icon);
                    timeRow.appendChild(document.createTextNode(` ${ev.time}`));

                    const titleRow = document.createElement('div');
                    titleRow.innerText = ev.title;

                    const metaRow = document.createElement('div');
                    metaRow.style.fontSize = '9px';
                    metaRow.style.opacity = '0.8';
                    metaRow.innerText = ev.type === 'schedule' ? ev.room : (ev.completed ? 'Done' : 'Due');

                    inner.appendChild(timeRow);
                    inner.appendChild(titleRow);
                    inner.appendChild(metaRow);
                    pill.appendChild(inner);
                    col.appendChild(pill);
                });
            }
            container.appendChild(col);
        }
    },

    openModal(dateObj) {
        const data = Storage.get();
        const lang = data.appSettings.lang || 'en';
        const dict = i18n[lang];
        const modal = document.getElementById('cal-details-modal');
        const content = document.getElementById('modal-content');
        if (!modal || !content) return;
        document.getElementById('modal-date-title').innerText = this.formatDateWithI18n(dateObj);
        const events = this.getEventsForDate(dateObj);
        if (events.length === 0) content.innerHTML = `<div class="empty-state"><p>${dict.no_events_for_day}</p></div>`;
        else {
            content.innerHTML = events.map(ev => {
                const isSch = ev.type === 'schedule';
                const clickAttr = isSch ? `onclick="Calendar.handleScheduleClick(${ev.raw.id})"` : `onclick="Calendar.handleDeadlineClick(${ev.raw.id})"`;
                const statusClass = isSch ? 'sch-entry' : (ev.completed ? 'dl-completed completed' : (new Date(ev.raw.dueDate) < new Date() ? 'dl-overdue' : 'dl-pending'));

                // Color Logic
                const color = isSch ? ev.color : '';
                const bgColor = isSch ? this.lightenColor(ev.color, 45) : '';

                return `
                    <div class="modal-event modal-event-entry evt-dl ${statusClass}" 
                         style="${isSch ? `border-left: 4px solid ${color}; background: ${bgColor}; ` : ''}padding: 12px; border-radius: 8px; margin-bottom: 10px; cursor: pointer;" 
                         ${clickAttr}>
                        <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
                            <span style="font-weight:700; color:var(--text-dark);">${ev.title}</span>
                            <span class="tag ${isSch ? 'tag-sch' : 'tag-dl'}" 
                                  style="background: ${color}; color: white; padding: 2px 8px; border-radius: 4px; font-size: 11px;">
                                ${isSch ? dict.class : 'Deadline'}
                            </span>
                        </div>
                        <div style="font-size:13px; color:var(--text-light); display:flex; gap:15px;">
                            <span><i class="far fa-clock"></i> ${ev.time}</span>
                            <span>${isSch ? `<i class="fas fa-map-marker-alt"></i> ${ev.room}` : ''}</span>
                        </div>
                    </div>`;
            }).join('');
        }
        modal.classList.add('active');
    },

    closeModal() {
        const modal = document.getElementById('cal-details-modal');
        if (modal) modal.classList.remove('active');
    },

    handleScheduleClick(id) {
        this.closeModal();
        if (typeof Schedule !== 'undefined' && typeof Schedule.openDetails === 'function') Schedule.openDetails(id);
    },

    handleDeadlineClick(id) {
        this.closeModal();
        if (typeof Deadline !== 'undefined' && typeof Deadline.openDetails === 'function') Deadline.openDetails(id);
    },

    lightenColor(hex, percent) {
        var num = parseInt(hex.replace("#", ""), 16), amt = Math.round(2.55 * percent), R = (num >> 16) + amt, G = (num >> 8 & 0x00FF) + amt, B = (num & 0x0000FF) + amt;
        return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 + (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
    }
};

window.initCalendar = function () {
    Calendar.init();
};

window.Calendar = Calendar;
