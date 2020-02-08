const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "73e58e5716904b8f0c8e5d54c3dc79f1";


let api = {
    trending: function(callback){
        fetch(BASE_URL+"/trending/all/day?api_key="+API_KEY).then(response => response.json()).then(response => {
            callback(response);
        });
    },
    nowPlaying: function(callback){
        fetch(BASE_URL+"/movie/now_playing?api_key="+API_KEY).then(response => response.json()).then(response => {
            callback(response);
        });
    },
    popular: function(callback){
        fetch(BASE_URL+"/movie/popular?api_key="+API_KEY).then(response => response.json()).then(response => {
            callback(response);
        });
    },
    top: function(callback){
        fetch(BASE_URL+"/movie/top_rated?api_key="+API_KEY).then(response => response.json()).then(response => {
            callback(response);
        });
    },
    search: function(callback){
        var segment_str = window.location.pathname; // return segment1/segment2/segment3/segment4
        var segment_array = segment_str.split( '/' );
        var myParam = segment_array.pop();
        fetch(BASE_URL+"/search/multi?query="+myParam+"&api_key="+API_KEY).then(response => response.json()).then(response => {
            callback(response);
        });
    },
    recommend: function(callback){
        var segment_str = window.location.pathname; // return segment1/segment2/segment3/segment4
        var segment_array = segment_str.split( '/' );
        var myParam = segment_array.pop();
        fetch(BASE_URL+"/movie/"+myParam+"/recommendations?api_key="+API_KEY).then(response => response.json()).then(response => {
            callback(response);
        });
    }
}

export default api;