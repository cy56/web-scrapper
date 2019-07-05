class Exporter
{
    constructor() {

    }

    static export() {
        
    }
}

module.export = async (req, res) => {
    const controller = new Exporter();
    let { brand, source, start, end } = req.body;

};