import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';

const LunarCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [lunarPhase, setLunarPhase] = useState('');

  // Diccionario para traducir las fases lunares al español
  const lunarPhasesInSpanish = {
    "New Moon": "Luna Nueva",
    "Waxing Crescent": "Creciente Iluminante",
    "First Quarter": "Cuarto Creciente",
    "Waxing Gibbous": "Gibosa Iluminante",
    "Full Moon": "Luna Llena",
    "Waning Gibbous": "Gibosa Menguante",
    "Last Quarter": "Cuarto Menguante",
    "Waning Crescent": "Creciente Menguante",
  };

  useEffect(() => {
    fetchLunarPhase(date);
  }, [date]);

  // Función para obtener la fase lunar desde la API de Farmsense
  const fetchLunarPhase = async (date) => {
    const unixDate = Math.floor(date.getTime() / 1000);  // Convertir la fecha a formato Unix
    try {
      const response = await axios.get(`http://api.farmsense.net/v1/moonphases/?d=${unixDate}`);
      const phase = response.data[0]?.Phase;  // La fase lunar viene en el campo 'Phase'
      // Traducir la fase lunar al español
      const translatedPhase = lunarPhasesInSpanish[phase] || "Fase desconocida";
      setLunarPhase(translatedPhase);
    } catch (error) {
      console.error("Error fetching lunar phase:", error);
      setLunarPhase("Error obteniendo los datos");
    }
  };

  const onChange = (date) => {
    setDate(date);
  };

  return (
    <div className="Calendar-container">
      <h2>Selecciona una fecha:</h2>
      <Calendar onChange={onChange} value={date} />
   {/*    <h2>Fecha seleccionada: {date.toDateString()}</h2> */}
      <h2>Fase Lunar: {lunarPhase || "Obteniendo..."}</h2>
    </div>
  );
};

export default LunarCalendar;
