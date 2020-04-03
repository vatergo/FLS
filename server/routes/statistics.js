import { Router } from 'express';
import path from 'path';
import dayjs from 'dayjs';
import readCsv from '../readCsv';

const router = Router();

const quarterOfYear = require('dayjs/plugin/quarterOfYear');
const localizedFormat = require('dayjs/plugin/localizedFormat');
const weekOfYear = require('dayjs/plugin/weekOfYear');
const dayOfYear = require('dayjs/plugin/dayOfYear');
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
    res.json(getFormatedData(dayjs(row.timestamp).quarter));
});

router.get('/month', (req, res) => {
    if (!data) {
        return res.status(404).json({ message: 'Данные не найдены' });
    }
    let quarterlyData = [];
    let currentMonth;
    let currentDay;
    data.forEach((row) => {
        if (currentMonth === undefined || currentMonth !== dayjs(row.timestamp).month()) {
            currentMonth = dayjs(row.timestamp).month();
            if (isNaN(currentMonth)) return;
            quarterlyData.push([]);
        }
        if (currentDay === undefined || currentDay !== dayjs(row.timestamp).dayOfYear()) {
            currentDay = dayjs(row.timestamp).dayOfYear();
            quarterlyData[quarterlyData.length - 1].push({
                timestamp: dayjs(row.timestamp).format('ll'),
                webstorm: row.webstorm ? +row.webstorm : 0,
                goland: row.goland ? +row.goland : 0,
                idea: row.idea ? +row.idea : 0,
            });
        } else {
            const index = quarterlyData[quarterlyData.length - 1].length - 1;
            const currentRow = quarterlyData[quarterlyData.length - 1][index];
            quarterlyData[quarterlyData.length - 1][index] = {
                timestamp: currentRow.timestamp,
                webstorm: row.webstorm ? currentRow.webstorm + +row.webstorm : currentRow.webstorm,
                goland: row.goland ? currentRow.goland + +row.goland : currentRow.goland,
                idea: row.idea ? currentRow.idea + +row.idea : currentRow.idea,
            };
        }
    });
    res.json(quarterlyData);
});

router.get('/week', (req, res) => {
    if (!data) {
        return res.status(404).json({ message: 'Данные не найдены' });
    }
    let quarterlyData = [];
    let currentWeek;
    let currentDay;
    data.forEach((row) => {
        if (currentWeek === undefined || currentWeek !== dayjs(row.timestamp).week()) {
            currentWeek = dayjs(row.timestamp).week();
            if (isNaN(currentWeek)) return;
            quarterlyData.push([]);
        }
        if (currentDay === undefined || currentDay !== dayjs(row.timestamp).dayOfYear()) {
            currentDay = dayjs(row.timestamp).dayOfYear();
            quarterlyData[quarterlyData.length - 1].push({
                timestamp: dayjs(row.timestamp).format('ll'),
                webstorm: row.webstorm ? +row.webstorm : 0,
                goland: row.goland ? +row.goland : 0,
                idea: row.idea ? +row.idea : 0,
            });
        } else {
            const index = quarterlyData[quarterlyData.length - 1].length - 1;
            const currentRow = quarterlyData[quarterlyData.length - 1][index];
            quarterlyData[quarterlyData.length - 1][index] = {
                timestamp: currentRow.timestamp,
                webstorm: row.webstorm ? currentRow.webstorm + +row.webstorm : currentRow.webstorm,
                goland: row.goland ? currentRow.goland + +row.goland : currentRow.goland,
                idea: row.idea ? currentRow.idea + +row.idea : currentRow.idea,
            }
        }
    });
    res.json(quarterlyData);
});

router.get('/day', (req, res) => {
    if (!data) {
        return res.status(404).json({ message: 'Данные не найдены' });
    }
    let quarterlyData = [];
    let currentDay;
    data.forEach((row) => {
        if (currentDay === undefined || currentDay !== dayjs(row.timestamp).dayOfYear()) {
            currentDay = dayjs(row.timestamp).dayOfYear();
            if (isNaN(currentDay)) return;
            quarterlyData.push([]);
        }
        quarterlyData[quarterlyData.length - 1].push({
            timestamp: dayjs(row.timestamp).format('LT'),
            webstorm: row.webstorm ? +row.webstorm : 0,
            goland: row.goland ? +row.goland : 0,
            idea: row.idea ? +row.idea : 0
        });
    });
    res.json(quarterlyData);
});

function getFormatedData(getCurrentPeriod) {
    let formatedData = [];
    let currentPeriod;
    let currentDay;
    data.forEach((row) => {
        if (currentPeriod === undefined || currentPeriod !== getCurrentPeriod()) {
            currentPeriod = getCurrentPeriod();
            if (isNaN(currentPeriod)) return;
            formatedData.push([]);
        }
        if (currentDay === undefined || currentDay !== dayjs(row.timestamp).dayOfYear()) {
            currentDay = dayjs(row.timestamp).dayOfYear();
            formatedData[formatedData.length - 1].push({
                timestamp: dayjs(row.timestamp).format('ll'),
                webstorm: row.webstorm ? +row.webstorm : 0,
                goland: row.goland ? +row.goland : 0,
                idea: row.idea ? +row.idea : 0,
            });
        } else {
            const index = formatedData[formatedData.length - 1].length - 1;
            const currentRow = formatedData[formatedData.length - 1][index];
            formatedData[formatedData.length - 1][index] = {
                timestamp: currentRow.timestamp,
                webstorm: row.webstorm ? currentRow.webstorm + +row.webstorm : currentRow.webstorm,
                goland: row.goland ? currentRow.goland + +row.goland : currentRow.goland,
                idea: row.idea ? currentRow.idea + +row.idea : currentRow.idea,
            };
        }
    });
    return formatedData;
}

export default router;