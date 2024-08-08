import { read, utils } from 'xlsx';
import { ChangeEvent, FormEvent, useState } from "react";
import jsPDF from 'jspdf';
import './style.css'

export const ExportPDF = () => {

    const [url, setUrl] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<any[]>([]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.stopPropagation();
        setUrl(e.target.value)
    };

    const getDataFromExcel = async () => {
        const f = await (await fetch(url)).arrayBuffer();
        const wb = read(f); // parse the array buffer
        const ws = wb.Sheets[wb.SheetNames[0]]; // get the first worksheet
        const data: any = utils.sheet_to_json(ws); // generate objects
        return data;
    };

    const generatePdf = (data: any) => {
        if(Array.isArray(data)) {
            let number: number = 1;
            data.forEach(element => {
                const doc = new jsPDF();
                // Define the title text
                const title = 'Contrat de travail';

                // Get page width and title width
                const pageWidth = doc.internal.pageSize.width;
                const titleWidth = doc.getTextWidth(title);

                // Calculate X position to center the title
                const xPosition = (pageWidth - titleWidth) / 2;

                // Set font size and add title to the PDF
                doc.setFontSize(22);
                doc.text(title, xPosition, 20); // Y position is 20, adjust as needed


                doc.setFontSize(12);
                let yPosition = 60;
                for (const [key, value] of Object.entries(element)) {
                    
                    doc.text(`${key}: ${value}`, 14, yPosition);
                    yPosition += 10;
                }

                const company = 'Societe XYZ';

                const textWidth = doc.getTextWidth(company);
                const rightPosition = pageWidth - textWidth - 10;
                doc.text(company, rightPosition, 60);


                doc.save(`Contrat du travail du candidat ${number }`);
                number++;
            });
        }
    };

    const exportToPDF = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
            setTimeout(async() => {
                const exportPdf = async () => {
                    const data = await getDataFromExcel();
                    generatePdf(data);
                }
                await exportPdf()
                .then(() => {
                    setLoading(false);
                })
                .catch((e) => {
                    console.log('[ERROR]:', e);
                    setLoading(false);
                })
            }, 2000);
        } catch (e) {
            console.log('[ERROR]:', e);
            setLoading(false);
        }
    };

    return <div className="container mt-4">
        <h1 className="text-center text-bg-dark">Import Excel</h1>
        <div className="form-container">
            <form onSubmit={exportToPDF}>
                <div className="mb-3">
                    <div className="form-group">
                        <label htmlFor="fileInput" className="text-bg-dark">Entrer l'url de googlesheet en csv</label>
                    </div>
                    <input className="form-control" type="url" value={url} onChange={handleChange} />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                >
                    {!loading && <>Importer</>}
                    {loading && (
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Chargement...</span>
                        </div>
                    )}
                </button>
            </form>
            <div>
                <h2 className="text-center text-bg-dark m-4">Liste des imports</h2>
                <div className="d-flex justify-content-between full-width mt-3">
                    <div>
                        <form className="d-flex">
                            <input className="form-control" type="text" value={url} onChange={handleChange} placeholder='Rechercher...' />
                            <button type="submit" className="mx-2 btn btn-primary">
                                Filtrer
                            </button>
                        </form>
                    </div>
                    {data.length > 0 && (
                        <div>
                            <button className="btn btn-primary">Exporter</button>
                        </div>
                    )}
                </div>
                {data.length > 0 && (
                    <table className="table table-dark table-striped table-sm my-2">
                        <thead>
                            <tr>
                                <th scope="col">First</th>
                                <th scope="col">Last</th>
                                <th scope="col">Handle</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                        </tbody>
                    </table>
                )}
                {data.length === 0 && (
                    <h6 className="my-4 text-center text-bg-dark empty-list">Liste vide</h6>
                )}
            </div>
        </div>
    </div>
}