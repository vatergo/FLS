import { Router } from 'express';
import path from 'path';
import dayjs from 'dayjs';
import readCsv from '../readCsv';

const router = Router();

const quarterOfYear = require('dayjs/plugin/quarterOfYear');
const localizedFormat = require('dayjs/plugin/localizedFormat');
const weekOfYear = require('dayjs/plugin/weekOfYear');
const dayOfYear = require('dayjs/plugin/dayOfYear');
const utc = require('dayjs/plugin/utc')
dayjs.extend(utc)
dayjs.extend(quarterOfYear);
dayjs.extend(localizedFormat);
dayjs.extend(weekOfYear);
dayjs.extend(dayOfYear);

let data;

try {
    data = readCsv(path.join(__dirname, '../fls-data.csv'));
} catch (er) {
    console.log(er.message);
}

router.get('/quarter', (req, res) => {
    if (!data) {
        return res.status(404).json({ message: 'Данные не найдены' });
    }
    const formatedData = getFormatedData((item) => dayjs(item).utc().quarter(), 91);
    res.json(formatedData);
});

router.get('/month', (req, res) => {
    if (!data) {
        return res.status(404).json({ message: 'Данные не найдены' });
    }
    const formatedData = getFormatedData((item) => dayjs(item).utc().month(), 30);
    res.json(formatedData);
});

router.get('/week', (req, res) => {
    if (!data) {
        return res.status(404).json({ message: 'Данные не найдены' });
    }
    const formatedData = getFormatedData((item) => dayjs(item).utc().week(), 7);
    res.json(formatedData);
});

router.get('/day', (req, res) => {
    if (!data) {
        return res.status(404).json({ message: 'Данные не найдены' });
    }
    let formatedData = [];
    let currentDay;
    data.forEach((row) => {
        if (currentDay === undefined || currentDay !== dayjs(row.timestamp).utc().dayOfYear()) {
            currentDay = dayjs(row.timestamp).utc().dayOfYear();
            if (isNaN(currentDay)) return;
            if (formatedData.length > 0) {
                correctMinAvg(formatedData[formatedData.length - 1], 30);
            }
            formatedData.push({
                data: [],
                webstorm: { min: Number.MAX_VALUE, max: 0, avg: 0 },
                goland: { min: Number.MAX_VALUE, max: 0, avg: 0 },
                idea: { min: Number.MAX_VALUE, max: 0, avg: 0 },
            });
        }
        formatedData[formatedData.length - 1].data.push({
            timestamp: dayjs(row.timestamp).utc().format('LT'),
            webstorm: +row.webstorm ? +row.webstorm : 0,
            goland: +row.goland ? +row.goland : 0,
            idea: +row.idea ? +row.idea : 0
        });
        getMinMaxSum(formatedData[formatedData.length - 1], row);
    });
    if (formatedData.length > 0) {
        correctMinAvg(formatedData[formatedData.length - 1], 30);
    }
    res.json(formatedData);
});

function getFormatedData(getCurrentPeriod, quantityInPeriod) {
    let formatedData = [];
    let currentPeriod;
    let currentDay;
    data.forEach((row) => {
        if (currentPeriod === undefined || currentPeriod !== getCurrentPeriod(row.timestamp)) {
            currentPeriod = getCurrentPeriod(row.timestamp);
            if (isNaN(currentPeriod)) return;
            if (formatedData.length > 0) {
                correctMinAvg(formatedData[formatedData.length - 1], quantityInPeriod);
            }
            formatedData.push({
                data: [],
                webstorm: { min: Number.MAX_VALUE, max: 0, avg: 0 },
                goland: { min: Number.MAX_VALUE, max: 0, avg: 0 },
                idea: { min: Number.MAX_VALUE, max: 0, avg: 0 },
            });
        }
        if (currentDay === undefined || currentDay !== dayjs(row.timestamp).utc().dayOfYear()) {
            currentDay = dayjs(row.timestamp).utc().dayOfYear();
            formatedData[formatedData.length - 1].data.push({
                timestamp: dayjs(row.timestamp).utc().format('ll'),
                webstorm: +row.webstorm ? +row.webstorm : 0,
                goland: +row.goland ? +row.goland : 0,
                idea: +row.idea ? +row.idea : 0,
            });
        } else {
            const index = formatedData[formatedData.length - 1].data.length - 1;
            const currentRow = formatedData[formatedData.length - 1].data[index];
            formatedData[formatedData.length - 1].data[index] = {
                timestamp: currentRow.timestamp,
                webstorm: +row.webstorm ? currentRow.webstorm + +row.webstorm : currentRow.webstorm,
                goland: +row.goland ? currentRow.goland + +row.goland : currentRow.goland,
                idea: +row.idea ? currentRow.idea + +row.idea : currentRow.idea,
            };
        }
        getMinMaxSum(formatedData[formatedData.length - 1], row);
    });
    if (formatedData.length > 0) {
        correctMinAvg(formatedData[formatedData.length - 1], quantityInPeriod);
    }
    return formatedData;
}

function getMinMaxSum(currentPeriod) {
    const index = currentPeriod.data.length - 1;
    const currentRow = currentPeriod.data[index];
    if (+currentRow.webstorm && currentPeriod.webstorm.min > +currentRow.webstorm)
        currentPeriod.webstorm.min = +currentRow.webstorm;
    if (+currentRow.goland && currentPeriod.goland.min > +currentRow.goland)
        currentPeriod.goland.min = +currentRow.goland;
    if (+currentRow.idea && currentPeriod.idea.min > +currentRow.idea)
        currentPeriod.idea.min = +currentRow.idea;
    if (currentPeriod.webstorm.max < +currentRow.webstorm)
        currentPeriod.webstorm.max = +currentRow.webstorm;
    if (currentPeriod.goland.max < +currentRow.goland)
        currentPeriod.goland.max = +currentRow.goland;
    if (currentPeriod.idea.max < +currentRow.idea)
        currentPeriod.idea.max = +currentRow.idea;
    currentPeriod.webstorm.avg += +currentRow.webstorm ? +currentRow.webstorm : 0;
    currentPeriod.goland.avg += +currentRow.goland ? +currentRow.goland : 0;
    currentPeriod.idea.avg += +currentRow.idea ? +currentRow.idea : 0;
}

function correctMinAvg(currentPeriod, quantityInPeriod) {
    getAvg(currentPeriod, quantityInPeriod);
    currentPeriod.webstorm.min = currentPeriod.webstorm.min !== Number.MAX_VALUE
        ? currentPeriod.webstorm.min : 0;
    currentPeriod.goland.min = currentPeriod.goland.min !== Number.MAX_VALUE
        ? currentPeriod.goland.min : 0;
    currentPeriod.idea.min = currentPeriod.idea.min !== Number.MAX_VALUE
        ? currentPeriod.idea.min : 0;
}

function getAvg(currentPeriod, quantityInPeriod) {
    currentPeriod.webstorm.avg = Math.round(currentPeriod.webstorm.avg / quantityInPeriod);
    currentPeriod.goland.avg = Math.round(currentPeriod.goland.avg / quantityInPeriod);
    currentPeriod.idea.avg = Math.round(currentPeriod.idea.avg / quantityInPeriod);
}

export default router;