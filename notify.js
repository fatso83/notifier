#!/usr/bin/env node

const moment = require("moment");
const notifier = require("node-notifier");
const path = require("path");
const fs = require("fs");
const exe = path.basename(process.argv[1]);
const filename = `${process.env.HOME}/.my-notifications.json`;
let notifications;

if (!fs.existsSync(filename)) {
  write([]);
}
notifications = require(filename);

var msgBase = {
  title: "REMEMBER!",
  subtitle: "My subtitle",
  message: null,
  wait: true
};

//notifier.notify(msg);
function write(obj) {
  fs.writeFileSync(filename, JSON.stringify(obj));
}

function parseTime(ts) {
  const [h, m] = ts.split(":");
  return moment()
    .hour(Number(h))
    .minute(Number(m))
    .second(00);
}

function add(time, notification) {
  notifications.push({
    time: parseTime(time),
    data: { ...msgBase, message: notification }
  });

  write(notifications);
}

if (exe === "add-notification") {
  if (process.argv.length !== 4) {
    console.warn(`Usage: ${exe} 17:33 "Remember the milk"`);
    process.exit(1);
  }
  const time = process.argv[2];
  const notification = process.argv[3];
  add(time, notification);
} else if (exe === "check-notifications") {
  console.log(notifications);
}
