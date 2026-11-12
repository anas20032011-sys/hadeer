// عامل خدمة بسيط: يُستخدم فقط لعرض إشعارات المتصفح والنقر عليها. لا يخزّن صفحات ولا يعمل في الخلفية بدون خادم.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({ type:'window', includeUncontrolled:true }).then(list => {
    for(const c of list){ if('focus' in c) return c.focus(); }
    return self.clients.openWindow('./');
  }));
});
