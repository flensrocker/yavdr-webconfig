module.exports = {
    controller: (logicFunc) => {
        return (req, res) => {
            try {
                var ret = logicFunc(req.body);
                if (ret.status) {
                    res.status(ret.status);
                }
                if (ret.response) {
                    res.json(ret.response);
                } else {
                    throw new Error('No Response');
                }
            } catch (err) {
                res.status(500)
                    .json({ msg: 'Error: ' + (err.message ? err.message : '') });
            }
        };
    }
};
