
    var dev = window.localStorage.getItem('currentHost') || 'http://10.0.7.100:18900';
    window.ShiYue = {
        base: dev,
        pageSize: 30,
        notAllowUpload: ['jspx', 'jsp', 'exe']
    }