import jsPDF from "jspdf";
import * as XLSX from 'xlsx';
import { ChangeEvent, useState } from "react";

export const ExportPDF = () => {

    const [data, setData] = useState([]);

    const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            const reader = new FileReader();
        
            reader.onload = (event) => {
            const workbook = XLSX.read(event.target?.result, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const sheetData = XLSX.utils.sheet_to_json(sheet);
        
            setData(sheetData as any);
            };
        
            reader.readAsBinaryString(file);
        }
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.text("Excel Data:", 10, 10);
    
        data.forEach((row, index) => {
          doc.text(JSON.stringify(row), 10, 20 + (index * 10));
        });
    
        doc.save('data.pdf');
    };

    console.log('[DATA]', data)

    return <div className="container mt-4">
        <div className="mb-3">
            <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileUpload}
            className="form-control-file"
            />
        </div>
        <button
            onClick={exportToPDF}
            className="btn btn-primary"
            disabled={data.length === 0}
        >
            Export to PDF
        </button>
    </div>
}