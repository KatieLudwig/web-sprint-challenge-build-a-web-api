// add middlewares here related to actions
const Actions = require('./actions-model');

function logger(req, res, next) {
    console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url}`);
    next();
}

function validateActionId(req, res, next) {
    const { id } = req.params;
    Actions.get(id)
        .then(action => {
            if (action) {
                req.action = action;
                next();
            } else {
                res.status(404).json({ message: 'Action not found' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Error retrieving action' });
        });
}

function validateAction(req, res, next) {
    const { project_id, description, notes } = req.body;
    if (!project_id ||!description || !notes) {
        return res.status(400).json({ message: 'Missing required field' });
    }
    next();
}

module.exports = {
    logger,
    validateActionId,
    validateAction
};
