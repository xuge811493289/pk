var dev = window.localStorage.getItem('currentHost') || '';
window.ShiYue = {
    base: dev,
    pageSize: 30,
    notAllowUpload: ['jspx', 'jsp', 'exe']
}