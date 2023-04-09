var pool = require('../db/index');

exports.groupGetAll = (req, res) => {
    const { s_id } = req.body

    pool.query(`SELECT studygroups.group_id, chatrooms.chat_id, name, icon, content, sent FROM chatrooms JOIN members ON chatrooms.chat_id=members.chat_id JOIN messages ON chatrooms.chat_id=messages.chat_id JOIN studygroups on studygroups.chat_id=chatrooms.chat_id WHERE members.s_id=${s_id} AND isStudyGroup=${1} ORDER BY sent LIMIT 1`, (err, results) => {
        if (err) throw err;
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
    const { loc } = req.body
    console.log(loc)

    pool.query(`SELECT loc_id FROM map WHERE loc_name=${loc}`, (err, result) => {
        if (err) throw err;
        else {
            // const chat_id = result[1][0]['LAST_INSERT_ID()']
            // pool.query(`INSERT INTO members (chat_id, s_id) VALUES (${chat_id}, ${s_id})`, (err, result) => {
            //     if (err) throw err;
            //     else {
            //         res.json({ code: 200 })
            //     }
            // });
            res.json(result)
        }
    });

    // pool.query(`INSERT INTO chatrooms (name, description, icon) VALUES ('${name}', '${description}', '${icon}'); SELECT LAST_INSERT_ID();`, (err, result) => {
    //     if (err) throw err;
    //     else {
    //         const chat_id = result[1][0]['LAST_INSERT_ID()']
    //         pool.query(`INSERT INTO members (chat_id, s_id) VALUES (${chat_id}, ${s_id})`, (err, result) => {
    //             if (err) throw err;
    //             else {
    //                 res.json({ code: 200 })
    //             }
    //         });
    //     }
    // });
};