var pool = require('../db/index');

exports.groupGetAll = (req, res) => {
    const { s_id } = req.body

    pool.query(`SELECT studygroups.group_id, chatrooms.chat_id, group_name, group_icon, content, sent FROM studygroups JOIN chatrooms ON studygroups.chat_id=chatrooms.chat_id JOIN groupmembers ON groupmembers.group_id=studygroups.group_id LEFT OUTER JOIN messages ON chatrooms.chat_id=messages.chat_id  WHERE groupmembers.s_id=${s_id} AND isStudyGroup=1 ORDER BY sent LIMIT 1`, (err, results) => {
        if (err) {
            res.json({ error: err })
        }
        else {
            if (results.length === 0) {
                res.json({ code: 401 });
            }
            else if (!results[0]) {
                res.json({ code: 401 });
            }
            else {
                res.json({ code: 200, chatrooms: results });
            }
        }
    });
};

exports.groupCreate = (req, res) => {
    const { s_id, group_name, group_icon, c_id, meet_day, meet_time, location, description } = req.body
    pool.query(`INSERT INTO chatrooms (name, description, icon, isStudyGroup) VALUES ('${group_name}', '${description}', '${group_icon}', 1); SELECT LAST_INSERT_ID();`, (err, result) => {
        if (err) {
            res.json({ error: err })
        } else {
            const chat_id = result[1][0]['LAST_INSERT_ID()']
            pool.query(`INSERT INTO studygroups (group_name, chat_id, group_icon, c_id, location, description) VALUES ('${group_name}', ${chat_id}, '${group_icon}', ${c_id}, '${location}', '${description}'); SELECT LAST_INSERT_ID();`, (err, result) => {
                if (err) {
                    res.json({ error: err })
                }
                else {
                    const group_id = result[1][0]['LAST_INSERT_ID()']
                    pool.query(`INSERT INTO groupmeets (group_id, meet_day, meet_time) VALUES (${group_id}, '${meet_day}', '${meet_time}'); INSERT INTO groupmembers (group_id, s_id) VALUES (${group_id}, ${s_id});`, (err, result) => {
                        if (err) {
                            res.json({ error: err })
                        }
                        else {
                            res.json({ code: 200})
                        }
                    });
                }
            });
        }
    })
};