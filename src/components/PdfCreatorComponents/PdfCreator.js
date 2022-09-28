import React from 'react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import Button from 'react-bootstrap/Button';

export default function PdfCreator(props) {
  const doc = new jsPDF();

  function exportTable() {
    autoTable(doc, { html: props.id });
    doc.save('export.pdf');
  }

  return (
    <Button
      className="bg-secondary bg-gradient text-white fw-bold m-4"
      onClick={exportTable}
    >
      Export PDF
    </Button>
  );
}
