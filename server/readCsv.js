import fs from 'fs';
import _ from 'lodash';

export default function readCsv(path) {
    const content = fs.readFileSync(path, 'utf8').split('\n');
    const header = content[0].split(',');
    return _.tail(content).map((row) => {
        return _.zipObject(header, row.split(','));
    });
}