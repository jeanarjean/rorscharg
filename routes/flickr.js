var express = require('express');
var request = require('request');
var router = express.Router();

function buildFlickrPhotoApi(farm, server, id, secret) {
    var string = 'https://farm' + farm + '.staticflickr.com/' + server + '/' + id + '_' + secret + '_h.jpg';
    return string;
}

router.get('/', function (req, res, next) {
    request('https://api.flickr.com/services/rest/?method=flickr.photosets.getphotos&format=json&user_id=156166587@N08&photoset_id=72157661594480778&api_key=856b7c68ff0760ad430e10b48c31c7be&format=json&nojsoncallback=1', {json: true}, function (err, response, body) {
        if (err) {
            return console.log(err);
        }
        var photos = body.photoset.photo;
        var photoUrls = new Array();
        photos.forEach(function (photo, index) {
            photoUrls[index] = buildFlickrPhotoApi(photo.farm, photo.server, photo.id, photo.secret);
        });
        console.log(photoUrls);
        res.render('index', {title: 'Heartbreak', tabarnak: photoUrls});
    });
})
;

module.exports = router;


