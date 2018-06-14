/*
    © 2018 Numigi (tm) and all its contributors (https://bit.ly/numigiens)
    License LGPL-3.0 or later (http://www.gnu.org/licenses/LGPL.html).
*/
odoo.define("web_contextual_search_favorite.FilterGroup", function(require) {
    "use strict";

var extractContentFromDomain = webContextualSearchFavorite.domainParsing.extractContentFromDomain;
var addExplicitAndOperatorsToDomainContent = webContextualSearchFavorite.domainParsing.addExplicitAndOperatorsToDomainContent;

require("web.search_inputs").FilterGroup.include({
    /**
     * When clicking on an item in the Filters dropdown, render a contextual domain filter.
     *
     * This method was copied and adapted from the source code of Odoo:
     *
     * odoo/addons/web/static/src/js/chrome/search_inputs.js
     */
    get_domain(facet) {
        var userContext = this.getSession().user_context;
        var domains = facet.values.chain()
            .map(function (f) { return f.get("value").attrs.domain; })
            .without("[]")
            .reject(_.isEmpty)
            .value();

        var domainContents = domains.map(extractContentFromDomain);
        var domainContentsWithExplicitAnds = domainContents.map(addExplicitAndOperatorsToDomainContent);
        var ors = _.times(domainContentsWithExplicitAnds.length - 1, _.constant("\"|\""));
        return "[" + ors.concat(domainContentsWithExplicitAnds).join(",") + "]";
    },
});

});
