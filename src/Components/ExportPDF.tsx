import { read, utils } from 'xlsx';
import { ChangeEvent, FormEvent, useState , MouseEvent} from "react";
import jsPDF from 'jspdf';
import './style.css'

const content = `

    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id nulla quis risus rhoncus sollicitudin non ut mauris. Aliquam eget quam quis sapien posuere bibendum et id justo. Fusce porttitor dui sit amet tellus bibendum, aliquet suscipit lectus pulvinar. Etiam ullamcorper libero vitae felis mattis aliquam. Ut ornare lacus a urna rutrum pharetra. Phasellus porttitor ligula orci, ut auctor massa convallis ac. Pellentesque scelerisque dui eget augue euismod sagittis. Sed metus justo, consectetur non nisl iaculis, dignissim porta arcu.

Donec volutpat tempor leo non tempus. Fusce est lacus, semper et lacus ac, pretium porta arcu. Ut ultricies, enim at volutpat commodo, magna erat tempor sem, nec elementum eros ante quis dolor. Aliquam ut sem nec purus tempor varius. Nulla et justo non libero volutpat iaculis in in diam. In quis sapien rutrum, aliquam enim at, placerat justo. Nullam aliquam at est at dapibus. Nunc quam lectus, vulputate ut interdum finibus, interdum in ex. Donec magna felis, condimentum sed lorem in, tempor venenatis odio. Nulla lacinia efficitur vehicula. Etiam luctus at orci nec semper. Etiam ut consectetur magna. Aliquam et erat commodo, posuere urna pulvinar, suscipit mauris.

Cras viverra gravida nisl, nec dapibus lectus rhoncus sed. Aenean dolor lectus, mattis nec arcu et, auctor posuere est. Nulla fringilla mattis elit sit amet rutrum. Fusce porttitor est et tellus laoreet tincidunt. Nullam tempus suscipit ultrices. Fusce lacinia ipsum et sagittis iaculis. Praesent justo turpis, accumsan sed bibendum vitae, feugiat sit amet lectus. Proin in lacinia massa.

Vivamus sollicitudin tristique ligula, ut dapibus massa finibus vel. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam suscipit mauris lobortis magna ornare iaculis. Pellentesque tincidunt leo quis bibendum elementum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce scelerisque libero non dolor molestie auctor. Pellentesque iaculis porttitor purus, eu posuere nisi tempus sed. Donec vulputate ullamcorper turpis pulvinar elementum. Nullam ullamcorper nisi non magna ornare blandit. Praesent vulputate placerat ligula quis fermentum.

Nullam nec condimentum augue. Duis euismod pulvinar tortor ac iaculis. Quisque et nunc pretium, bibendum diam eget, tincidunt justo. Donec placerat velit quis lectus porta maximus. Vestibulum pulvinar turpis eget justo sodales eleifend. Proin et urna est. Aliquam eget gravida turpis. Integer ut suscipit leo. Ut mauris mi, facilisis quis sagittis in, mattis et dolor. Nam vel ex id mi dapibus elementum. Suspendisse varius convallis arcu, id suscipit diam convallis vehicula. Aliquam finibus lorem sem, nec venenatis augue ultrices eu. Quisque nec convallis enim. Donec tempor, lorem in laoreet viverra, elit urna pellentesque diam, vel imperdiet urna sapien vitae leo. Nunc sit amet magna interdum, facilisis mi non, condimentum ipsum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id nulla quis risus rhoncus sollicitudin non ut mauris. Aliquam eget quam quis sapien posuere bibendum et id justo. Fusce porttitor dui sit amet tellus bibendum, aliquet suscipit lectus pulvinar. Etiam ullamcorper libero vitae felis mattis aliquam. Ut ornare lacus a urna rutrum pharetra. Phasellus porttitor ligula orci, ut auctor massa convallis ac. Pellentesque scelerisque dui eget augue euismod sagittis. Sed metus justo, consectetur non nisl iaculis, dignissim porta arcu.

Donec volutpat tempor leo non tempus. Fusce est lacus, semper et lacus ac, pretium porta arcu. Ut ultricies, enim at volutpat commodo, magna erat tempor sem, nec elementum eros ante quis dolor. Aliquam ut sem nec purus tempor varius. Nulla et justo non libero volutpat iaculis in in diam. In quis sapien rutrum, aliquam enim at, placerat justo. Nullam aliquam at est at dapibus. Nunc quam lectus, vulputate ut interdum finibus, interdum in ex. Donec magna felis, condimentum sed lorem in, tempor venenatis odio. Nulla lacinia efficitur vehicula. Etiam luctus at orci nec semper. Etiam ut consectetur magna. Aliquam et erat commodo, posuere urna pulvinar, suscipit mauris.

Cras viverra gravida nisl, nec dapibus lectus rhoncus sed. Aenean dolor lectus, mattis nec arcu et, auctor posuere est. Nulla fringilla mattis elit sit amet rutrum. Fusce porttitor est et tellus laoreet tincidunt. Nullam tempus suscipit ultrices. Fusce lacinia ipsum et sagittis iaculis. Praesent justo turpis, accumsan sed bibendum vitae, feugiat sit amet lectus. Proin in lacinia massa.

Vivamus sollicitudin tristique ligula, ut dapibus massa finibus vel. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam suscipit mauris lobortis magna ornare iaculis. Pellentesque tincidunt leo quis bibendum elementum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce scelerisque libero non dolor molestie auctor. Pellentesque iaculis porttitor purus, eu posuere nisi tempus sed. Donec vulputate ullamcorper turpis pulvinar elementum. Nullam ullamcorper nisi non magna ornare blandit. Praesent vulputate placerat ligula quis fermentum.

Nullam nec condimentum augue. Duis euismod pulvinar tortor ac iaculis. Quisque et nunc pretium, bibendum diam eget, tincidunt justo. Donec placerat velit quis lectus porta maximus. Vestibulum pulvinar turpis eget justo sodales eleifend. Proin et urna est. Aliquam eget gravida turpis. Integer ut suscipit leo. Ut mauris mi, facilisis quis sagittis in, mattis et dolor. Nam vel ex id mi dapibus elementum. Suspendisse varius convallis arcu, id suscipit diam convallis vehicula. Aliquam finibus lorem sem, nec venenatis augue ultrices eu. Quisque nec convallis enim. Donec tempor, lorem in laoreet viverra, elit urna pellentesque diam, vel imperdiet urna sapien vitae leo. Nunc sit amet magna interdum, facilisis mi non, condimentum ipsum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id nulla quis risus rhoncus sollicitudin non ut mauris. Aliquam eget quam quis sapien posuere bibendum et id justo. Fusce porttitor dui sit amet tellus bibendum, aliquet suscipit lectus pulvinar. Etiam ullamcorper libero vitae felis mattis aliquam. Ut ornare lacus a urna rutrum pharetra. Phasellus porttitor ligula orci, ut auctor massa convallis ac. Pellentesque scelerisque dui eget augue euismod sagittis. Sed metus justo, consectetur non nisl iaculis, dignissim porta arcu.

Donec volutpat tempor leo non tempus. Fusce est lacus, semper et lacus ac, pretium porta arcu. Ut ultricies, enim at volutpat commodo, magna erat tempor sem, nec elementum eros ante quis dolor. Aliquam ut sem nec purus tempor varius. Nulla et justo non libero volutpat iaculis in in diam. In quis sapien rutrum, aliquam enim at, placerat justo. Nullam aliquam at est at dapibus. Nunc quam lectus, vulputate ut interdum finibus, interdum in ex. Donec magna felis, condimentum sed lorem in, tempor venenatis odio. Nulla lacinia efficitur vehicula. Etiam luctus at orci nec semper. Etiam ut consectetur magna. Aliquam et erat commodo, posuere urna pulvinar, suscipit mauris.

Cras viverra gravida nisl, nec dapibus lectus rhoncus sed. Aenean dolor lectus, mattis nec arcu et, auctor posuere est. Nulla fringilla mattis elit sit amet rutrum. Fusce porttitor est et tellus laoreet tincidunt. Nullam tempus suscipit ultrices. Fusce lacinia ipsum et sagittis iaculis. Praesent justo turpis, accumsan sed bibendum vitae, feugiat sit amet lectus. Proin in lacinia massa.

Vivamus sollicitudin tristique ligula, ut dapibus massa finibus vel. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam suscipit mauris lobortis magna ornare iaculis. Pellentesque tincidunt leo quis bibendum elementum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce scelerisque libero non dolor molestie auctor. Pellentesque iaculis porttitor purus, eu posuere nisi tempus sed. Donec vulputate ullamcorper turpis pulvinar elementum. Nullam ullamcorper nisi non magna ornare blandit. Praesent vulputate placerat ligula quis fermentum.

Nullam nec condimentum augue. Duis euismod pulvinar tortor ac iaculis. Quisque et nunc pretium, bibendum diam eget, tincidunt justo. Donec placerat velit quis lectus porta maximus. Vestibulum pulvinar turpis eget justo sodales eleifend. Proin et urna est. Aliquam eget gravida turpis. Integer ut suscipit leo. Ut mauris mi, facilisis quis sagittis in, mattis et dolor. Nam vel ex id mi dapibus elementum. Suspendisse varius convallis arcu, id suscipit diam convallis vehicula. Aliquam finibus lorem sem, nec venenatis augue ultrices eu. Quisque nec convallis enim. Donec tempor, lorem in laoreet viverra, elit urna pellentesque diam, vel imperdiet urna sapien vitae leo. Nunc sit amet magna interdum, facilisis mi non, condimentum ipsum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
`;

export const ExportPDF = () => {

    const [url, setUrl] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<any[]>([]);
    const [filteredData, setFilteredData] = useState<any[]>([]);
    const [filter, setFilter] = useState<string>('');

    const handleFilter = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(filter) {
            const keys = Object.keys(data[0] || {});
            const filterData: any[] = (data || []).filter((val) => {
                return keys.some((k) => {
                    return `${val[k]}`.includes(filter);
                })
            });
            setFilteredData(filterData);
            return;
        } else {
            setFilteredData(data);
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.stopPropagation();
        setUrl(e.target.value)
    };

    const handleChangeFilter = (e: ChangeEvent<HTMLInputElement>) => {
        e.stopPropagation();
        setFilter(e.target.value)
    };

    const getDataFromExcel = async () => {
        const f = await (await fetch(url)).arrayBuffer();
        const wb = read(f); // parse the array buffer
        const ws = wb.Sheets[wb.SheetNames[0]]; // get the first worksheet
        const data: any = utils.sheet_to_json(ws); // generate objects
        return data;
    };

    const addParagraph = (doc: jsPDF, text: string, position: number) => {
        let y = position; // Starting y position for the text
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const lines = doc.splitTextToSize(text, pageWidth - 2 * 20);
        const lineHeight = 10;

        lines.forEach((line: any, index: any) => {
            if (y + lineHeight > pageHeight - 20) {
                // Add a new page if the text goes beyond the bottom margin
                doc.addPage();
                y = 20; // Reset y position for the new page
            }
            doc.text(line, 20, y);
            y += lineHeight;
        });
    };

    const generatePdf = (data: any) => {
        if(Array.isArray(data)) {
            let number: number = 1;
            const rightHeaderSide = {Societe: 'XYZ', Adresse: 'Adresse du société', Email: 'email@email.com'}
            data.forEach(element => {
                const doc = new jsPDF();

                doc.addFont('Arial', 'Helvetica', 'normal');
                doc.setFont('Helvetica');

                // Get page width and title width
                const pageWidth = doc.internal.pageSize.width;

                // Define the title text
                // Generate title
                const title = 'Contrat de travail';
                const titleWidth = doc.getTextWidth(title);
                // Calculate X position to center the title
                const xPosition = (pageWidth - titleWidth) / 2;
                // Set font size and add title to the PDF
                doc.setFontSize(22);
                doc.text(title, xPosition, 20); // Y position is 20, adjust as needed

                //Generate left side
                doc.setFontSize(12);
                let yLeftPosition = 60;
                for (const [key, value] of Object.entries(element)) {
                    
                    doc.text(`${key}: ${value}`, 14, yLeftPosition);
                    yLeftPosition += 10;
                }

                //Generate right side
                let yRightPosition: number = 60;
                for (const [key, value] of Object.entries(rightHeaderSide)) {
                    doc.text(`${key}: ${value}`, pageWidth - 80, yRightPosition);
                    yRightPosition += 10;
                }

                //Generate content
                const yContentPosition = Math.max(yLeftPosition, yRightPosition);
                addParagraph(doc, content, yContentPosition);
                //doc.text(content, 14, yContentPosition, { maxWidth: 180 });

                //Save the document;
                doc.save(`Contrat du travail du candidat ${number }`);
                number++;
            });
        }
    };

    const exportToPDF = async (e: MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        try {
            setLoading(true);
            setTimeout(async() => {
                const exportPdf = async () => {
                    generatePdf(filteredData);
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

    const importExcel = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
            setTimeout(async() => {
                const exportPdf = async () => {
                    const data = await getDataFromExcel();
                    setData(data);
                    setFilteredData(data);
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
            <form onSubmit={importExcel}>
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
                    Importer
                </button>
            </form>
            <div>
                <h2 className="text-center text-bg-dark m-4">Liste des imports</h2>
                <div className="d-flex justify-content-between full-width mt-3">
                    <div className="d-flex">
                        <form className="d-flex" onSubmit={handleFilter}>
                            <input className="form-control" type="text" value={filter} onChange={handleChangeFilter} placeholder='Rechercher...' />
                            <button type="submit" className="mx-2 btn btn-primary">
                                Filtrer
                            </button>
                        </form>
                    </div>
                    {filteredData.length > 0 && (
                        <div>
                            <button disabled={loading} onClick={exportToPDF} className="btn btn-primary">Exporter</button>
                        </div>
                    )}
                </div>
                {filteredData.length > 0 && (
                    <table className="table table-dark table-striped table-sm my-2">
                        <thead>
                            <tr>
                                {Object.keys(filteredData[0]).map((el, index) => {
                                    return <th key={index} scope="col">{el}</th>
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((el, index) => {
                                return <tr key={`${index}`}>
                                    {Object.keys(filteredData[0]).map((keyVal) => {
                                        return <td key={keyVal}>{el[keyVal]}</td>
                                    })}
                                </tr>
                            })}
                        </tbody>
                    </table>
                )}
                {filteredData.length === 0 && (
                    <h6 className="my-4 text-center text-bg-dark empty-list">Liste vide</h6>
                )}
            </div>
        </div>
    </div>
}