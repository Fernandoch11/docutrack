import React, { useRef, useEffect } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import verifyToken from './check_sesson'
import { useNavigate } from 'react-router-dom';

export default function Printer() {
  const navigate = useNavigate();


  useEffect(() => {
        const checkAccess = async () => {
            const userType = localStorage.getItem('type');
            const token = localStorage.getItem('token');

            if (userType !== 'USER') {
                localStorage.removeItem('type');
                localStorage.removeItem('token');
                navigate('/');
                return;
            }

            const isValid = await verifyToken(token);
            if (!isValid) {
                localStorage.removeItem('type');
                localStorage.removeItem('token');
                navigate('/');
            }
        };

        checkAccess();
    }, [navigate]);


  const ref = useRef();

  const searchParams = new URLSearchParams(window.location.search);
  const nombre = searchParams.get('nom')+' '+searchParams.get('ap');
  const cedula = searchParams.get('ced');
  const dt = searchParams.get('dt').split('-');
  const meses = ['','enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

  const generarPDF = async () => {
    const canvas = await html2canvas(ref.current);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    pdf.addImage(imgData, 'PNG', 10, 10);
    pdf.save('documento.pdf');
  };

  return (
    <div>
      <div className="d-flex flex-column align-items-center" ref={ref} style={{ backgroundColor: '#fffff' }}>
        <div className="row">
            
            
                <div className="col-md-4">
                    <h5 className="idh5" style={{textAlign:'center'}}>SE CERTIFICA</h5>
                    <p  style={{textAlign:'justify'}}>Que {nombre}, con cédula de identificación personal, No. {cedula}, de acuerdo con los registros de la Division de Gabinete de Archivos e Identificación Personal, no mantiene información de antecedentes personales.</p>

                    <p>Emitido a los {dt[2]} días del mes de {meses[parseInt(dt[1])]} de {dt[0]}.</p>
       
                    <p className="idh6"  style={{textAlign:'center'}}>Atentamente,</p>
                    <p className="idh5"  style={{textAlign:'center'}}>.....................................................................</p>
                    <p  style={{textAlign:'center'}}>Comisionado C. Medina</p>
                </div>


        </div>
      </div>
      <button onClick={generarPDF}>Descargar PDF</button>
    </div>
  )
}
