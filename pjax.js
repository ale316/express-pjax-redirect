module.exports = function() {
    return function(req, res, next) {
        if (req.header('X-PJAX')) {
            req.pjax = true;
        }

        res.renderPjax = function(view, options, fn) {
            if (req.pjax) {
                if(typeof options === "undefined") 
                    options = {};
                
                options.layout = false;
            }

            res.render(view, options, fn);
        };

        res.redirectPjax = function(view, options, fn) {
            if(typeof options === "undefined")
                options = {};
            
            if(typeof options.newUrl === "undefined")
                options.newUrl = view;

            res.header('X-PJAX-URL', options.newUrl);
            this.renderPjax(view, options, fn);
        };

        next();
    };
};
