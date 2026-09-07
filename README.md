MindCare NER
AI-Based Cognitive Gaming and Memory Assistance Platform for Elderly Dementia Patients in North Eastern Region (NER)

SIH26003

---

OVERVIEW

MindCare NER is a digital support platform for elderly dementia patients that combines adaptive cognitive games, daily memory assistance, and caregiver monitoring in one system.

Instead of offering the same activities to everyone, the platform tracks how a patient performs and adjusts the difficulty of the next activity accordingly — making cognitive engagement personalized, accessible, and culturally familiar for elderly people in remote areas of the North East.

Note: This platform supports cognitive engagement and helps caregivers notice changes in performance. It does not diagnose dementia or replace medical treatment.

---

PROBLEM STATEMENT

Existing Gap                                   | Our Approach
------------------------------------------------|----------------------------------------------
One-size-fits-all cognitive games                | Difficulty adapts to individual performance
Lack of culturally familiar content              | NER-based objects, themes, and visuals
Dependence on continuous internet                | Offline-first gameplay with later sync
Limited caregiver visibility                     | Dashboard with progress and activity trends
Cognitive support and reminders kept separate    | Combined into a single platform
Interfaces not built for elderly users           | Large buttons, simple navigation, voice guidance

---

CURRENT PROGRESS

[x] Memory Match cognitive game built with pass/fail tracking
[x] Adaptive difficulty logic — difficulty adjusts based on player accuracy and time taken
[x] NER cultural content integrated into game visuals
[x] MongoDB schema designed for patients, sessions, and reminders
[x] Session data (score, difficulty, timestamp) logged to database
[x] Caregiver dashboard displaying performance trends
[ ] Voice guidance
[ ] Full offline sync
[ ] Multi-game library

---

TECH STACK

Frontend: HTML / JavaScript (React)
Backend / Database: MongoDB
Visualization: Chart.js (caregiver dashboard)

---

ARCHITECTURE

Patient -> Cognitive Game -> Performance Data -> Adaptive Engine
                                    |
                              MongoDB (sessions, patients, reminders)
                                    |
                          Caregiver Dashboard (trends, alerts)

---

DATABASE SCHEMA

patients   { name, age, id }
sessions   { patientId, gameType, score, difficultyLevel, timestamp }
reminders  { patientId, type, time, status }

---

WHAT'S NEXT

- Expand to a second cognitive game (pattern matching / attention)
- Add voice-guided instructions in regional languages
- Build offline-first caching with background sync
- Add reminder notifications for medicine, hydration, and appointments
