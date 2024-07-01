// add middlewares here related to projects
const Projects = require('./projects-model');

function logger(req, res, next) {
    console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url}`);
    next();
}

function validateProjectId(req, res, next) {
    const { id } = req.params;
    Projects.get(id)
        .then(project => {
            if (project) {
                req.project = project;
                next();
            } else {
                res.status(404).json({ message: 'Project not found' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Error retrieving project' });
        });
}

function validateProject(req, res, next) {
    const { name, description } = req.body;
    if (!name || !description ) {
        return res.status(400).json({ message: 'Please provide a title and description' });
    }
    next();
}

function validateProjectUpdate(req, res, next) {
    const { name, description } = req.body;
    if (!name || !description) {
        return res.status(400).json({ message: 'Please provide a name and description' });
    }
    next();
}

module.exports = {
    logger,
    validateProjectId,
    validateProject,
    validateProjectUpdate
};
