import "momentum-trail"

declare module "momentum-trail" {
    export interface RouterGlobal {"url":"https:\/\/netisu-backup.test","port":null,"defaults":[],"routes":{"l5-swagger.default.api":{"uri":"api\/documentation","methods":["GET","HEAD"]},"l5-swagger.default.docs":{"uri":"docs\/{jsonFile?}","methods":["GET","HEAD"],"parameters":["jsonFile"]},"l5-swagger.default.asset":{"uri":"docs\/asset\/{asset}","methods":["GET","HEAD"],"parameters":["asset"]},"l5-swagger.default.oauth2_callback":{"uri":"api\/oauth2-callback","methods":["GET","HEAD"]},"passport.token":{"uri":"oauth\/token","methods":["POST"]},"passport.authorizations.authorize":{"uri":"oauth\/authorize","methods":["GET","HEAD"]},"passport.token.refresh":{"uri":"oauth\/token\/refresh","methods":["POST"]},"passport.authorizations.approve":{"uri":"oauth\/authorize","methods":["POST"]},"passport.authorizations.deny":{"uri":"oauth\/authorize","methods":["DELETE"]},"passport.tokens.index":{"uri":"oauth\/tokens","methods":["GET","HEAD"]},"passport.tokens.destroy":{"uri":"oauth\/tokens\/{token_id}","methods":["DELETE"],"parameters":["token_id"]},"passport.clients.index":{"uri":"oauth\/clients","methods":["GET","HEAD"]},"passport.clients.store":{"uri":"oauth\/clients","methods":["POST"]},"passport.clients.update":{"uri":"oauth\/clients\/{client_id}","methods":["PUT"],"parameters":["client_id"]},"passport.clients.destroy":{"uri":"oauth\/clients\/{client_id}","methods":["DELETE"],"parameters":["client_id"]},"passport.scopes.index":{"uri":"oauth\/scopes","methods":["GET","HEAD"]},"passport.personal.tokens.index":{"uri":"oauth\/personal-access-tokens","methods":["GET","HEAD"]},"passport.personal.tokens.store":{"uri":"oauth\/personal-access-tokens","methods":["POST"]},"passport.personal.tokens.destroy":{"uri":"oauth\/personal-access-tokens\/{token_id}","methods":["DELETE"],"parameters":["token_id"]},"sanctum.csrf-cookie":{"uri":"sanctum\/csrf-cookie","methods":["GET","HEAD"]},"telescope":{"uri":"telescope\/{view?}","methods":["GET","HEAD"],"wheres":{"view":"(.*)"},"parameters":["view"]},"api.":{"uri":"api","methods":["GET","HEAD"]},"api.search":{"uri":"api\/search","methods":["GET","HEAD"]},"api.avatar":{"uri":"api\/render\/validate\/{id}","methods":["GET","HEAD"],"parameters":["id"]},"api.user.":{"uri":"api\/users","methods":["GET","HEAD"]},"api.user.online":{"uri":"api\/users\/online\/{id}","methods":["GET","HEAD"],"parameters":["id"]},"api.user.status":{"uri":"api\/users\/status-list","methods":["GET","HEAD"]},"api.user.avatar":{"uri":"api\/users\/user\/img\/{id}","methods":["GET","HEAD"],"parameters":["id"]},"api.user.follow":{"uri":"api\/users\/follow\/{user}","methods":["GET","HEAD"],"parameters":["user"],"bindings":{"user":"id"}},"api.user.unfollow":{"uri":"api\/users\/unfollow\/{user}","methods":["POST"],"parameters":["user"],"bindings":{"user":"id"}},"api.dashboard.":{"uri":"api\/dash","methods":["GET","HEAD"]},"api.dashboard.statuses":{"uri":"api\/dash\/status-list","methods":["GET","HEAD"]},"api.notif.":{"uri":"api\/notifications","methods":["GET","HEAD"]},"api.notif.read-all":{"uri":"api\/notifications\/read-all","methods":["POST"]},"api.store.":{"uri":"api\/market","methods":["GET","HEAD"]},"api.store.items":{"uri":"api\/market\/items\/{category}","methods":["GET","HEAD"],"parameters":["category"]},"api.store.event.items":{"uri":"api\/market\/items\/event\/{eventId}","methods":["GET","HEAD"],"parameters":["eventId"]},"api.store.purchase":{"uri":"api\/market\/item\/purchase\/{id}\/{currencyType}","methods":["POST"],"parameters":["id","currencyType"]},"api.avatar.":{"uri":"api\/avatar","methods":["GET","HEAD"]},"api.avatar.items":{"uri":"api\/avatar\/{category}","methods":["GET","HEAD"],"parameters":["category"]},"api.avatar.wearing-items":{"uri":"api\/avatar\/wearing","methods":["GET","HEAD"]},"api.avatar.wearing-hats":{"uri":"api\/avatar\/wearing-hats","methods":["GET","HEAD"]},"api.avatar.wear-item":{"uri":"api\/avatar\/wear\/{id}\/{slot}","methods":["GET","HEAD"],"parameters":["id","slot"]},"api.settings.":{"uri":"api\/settings","methods":["GET","HEAD"]},"api.settings.changeCountry":{"uri":"api\/settings\/change-country\/{country}","methods":["POST"],"parameters":["country"]},"api.rss":{"uri":"api\/rss-feed","methods":["GET","HEAD"]},"api.thumbnails":{"uri":"api\/thumbnails\/{type}\/{id}","methods":["GET","HEAD"],"parameters":["type","id"]},"maintenance.page":{"uri":"maintenance","methods":["GET","HEAD"],"domain":"netisu-backup.test"},"maintenance.authenticate.password":{"uri":"maintenance\/password","methods":["POST"],"domain":"netisu-backup.test"},"maintenance.exit":{"uri":"maintenance\/exit","methods":["GET","HEAD"],"domain":"netisu-backup.test"},"leaderboard.page":{"uri":"leaderboard","methods":["GET","HEAD"],"domain":"netisu-backup.test"},"my.dashboard.page":{"uri":"my\/dashboard","methods":["GET","HEAD"],"domain":"netisu-backup.test"},"my.dashboard.validate":{"uri":"my\/dashboard","methods":["POST"],"domain":"netisu-backup.test"},"user.page":{"uri":"user\/discover","methods":["GET","HEAD"],"domain":"netisu-backup.test"},"user.profile":{"uri":"user\/@{username}","methods":["GET","HEAD"],"domain":"netisu-backup.test","parameters":["username"]},"user.settings.page":{"uri":"user\/settings","methods":["GET","HEAD"],"domain":"netisu-backup.test"},"user.settings.update":{"uri":"user\/settings\/update","methods":["PATCH"],"domain":"netisu-backup.test"},"user.settings.destroy":{"uri":"user\/settings\/delete-account","methods":["POST"],"domain":"netisu-backup.test"},"avatar.page":{"uri":"customize","methods":["GET","HEAD"],"domain":"netisu-backup.test"},"avatar.update":{"uri":"customize\/update","methods":["POST"],"domain":"netisu-backup.test"},"forum.page":{"uri":"discuss\/{id}","methods":["GET","HEAD"],"domain":"netisu-backup.test","parameters":["id"]},"forum.post":{"uri":"discuss\/post\/{id}\/{slug}","methods":["GET","HEAD"],"domain":"netisu-backup.test","parameters":["id","slug"]},"forum.create.page":{"uri":"discuss\/create\/{id}","methods":["GET","HEAD"],"domain":"netisu-backup.test","parameters":["id"]},"forum.create.validate":{"uri":"discuss\/create\/{id}\/validate","methods":["POST"],"domain":"netisu-backup.test","parameters":["id"]},"forum.reply.validate":{"uri":"discuss\/create\/reply\/{id}\/validate","methods":["POST"],"domain":"netisu-backup.test","parameters":["id"]},"chat.messages":{"uri":"messages\/messages","methods":["GET","HEAD"],"domain":"netisu-backup.test"},"chat.validate":{"uri":"messages\/message\/validate","methods":["POST"],"domain":"netisu-backup.test"},"acheivements":{"uri":"achievements","methods":["GET","HEAD"],"domain":"netisu-backup.test"},"auth.logout":{"uri":"auth\/logout","methods":["POST"],"domain":"netisu-backup.test"},"auth.language":{"uri":"auth\/set-language\/{language}","methods":["GET","HEAD"],"domain":"netisu-backup.test","parameters":["language"]},"auth.login.google":{"uri":"auth\/login\/google\/v1","methods":["GET","HEAD"],"domain":"netisu-backup.test"},"auth.login.google.validation":{"uri":"auth\/login\/callback\/google","methods":["GET","HEAD"],"domain":"netisu-backup.test"},"auth.login.page":{"uri":"auth\/login","methods":["GET","HEAD"],"domain":"netisu-backup.test"},"auth.login.validate":{"uri":"auth\/login\/validate","methods":["POST"],"domain":"netisu-backup.test"},"auth.login.metamask":{"uri":"auth\/login\/validate\/metamask","methods":["GET","HEAD"],"domain":"netisu-backup.test"},"auth.login.metamask.validation":{"uri":"auth\/login\/validate\/meta-mask-api","methods":["POST"],"domain":"netisu-backup.test"},"auth.register.page":{"uri":"auth\/register","methods":["GET","HEAD"],"domain":"netisu-backup.test"},"auth.register.validate":{"uri":"auth\/register\/validate","methods":["POST"],"domain":"netisu-backup.test"},"auth.forgot.page":{"uri":"auth\/forgot","methods":["GET","HEAD"],"domain":"netisu-backup.test"},"Welcome":{"uri":"\/","methods":["GET","HEAD"],"domain":"netisu-backup.test"},"games.page":{"uri":"games","methods":["GET","HEAD"],"domain":"netisu-backup.test"},"removed":{"uri":"deletion","methods":["GET","HEAD"],"domain":"netisu-backup.test"},"store.page":{"uri":"market","methods":["GET","HEAD"],"domain":"netisu-backup.test"},"store.create.page":{"uri":"market\/create","methods":["GET","HEAD"],"domain":"netisu-backup.test"},"store.create.validate":{"uri":"market\/create\/validate","methods":["POST"],"domain":"netisu-backup.test"},"store.item":{"uri":"market\/item\/{id}","methods":["GET","HEAD"],"domain":"netisu-backup.test","parameters":["id"]},"store.purchase":{"uri":"market\/item\/purchase\/{id}\/{currencyType}","methods":["POST"],"domain":"netisu-backup.test","parameters":["id","currencyType"]},"develop.page":{"uri":"develop","methods":["GET","HEAD"],"domain":"netisu-backup.test"},"develop.create.page":{"uri":"develop\/create","methods":["GET","HEAD"],"domain":"netisu-backup.test"},"develop.create.validate":{"uri":"develop\/create\/validate","methods":["POST"],"domain":"netisu-backup.test"},"develop.item":{"uri":"develop\/item\/{id}","methods":["GET","HEAD"],"domain":"netisu-backup.test","parameters":["id"]},"develop.purchase":{"uri":"develop\/item\/purchase\/{id}\/{currencyType}","methods":["POST"],"domain":"netisu-backup.test","parameters":["id","currencyType"]},"spaces.page":{"uri":"spaces","methods":["GET","HEAD"],"domain":"netisu-backup.test"},"spaces.view":{"uri":"spaces\/{id}\/{slug}","methods":["GET","HEAD"],"domain":"netisu-backup.test","parameters":["id","slug"]},"admin.page":{"uri":"\/","methods":["GET","HEAD"],"domain":"admin.netisu-backup.test"},"admin.users.page":{"uri":"users","methods":["GET","HEAD"],"domain":"admin.netisu-backup.test"},"admin.users.manage-user":{"uri":"users\/manage\/{id}","methods":["GET","HEAD"],"domain":"admin.netisu-backup.test","parameters":["id"]},"admin.items.page":{"uri":"items","methods":["GET","HEAD"],"domain":"admin.netisu-backup.test"},"admin.items.manage-item":{"uri":"items\/manage\/{id}","methods":["GET","HEAD"],"domain":"admin.netisu-backup.test","parameters":["id"]},"admin.items.create.create-item":{"uri":"items\/create","methods":["GET","HEAD"],"domain":"admin.netisu-backup.test"},"admin.items.create.validate":{"uri":"items\/create\/validate","methods":["POST"],"domain":"admin.netisu-backup.test"}},"wildcards":{"l5-swagger.*":[],"l5-swagger.default.*":[],"passport.*":[],"passport.authorizations.*":[],"passport.token.*":[],"passport.tokens.*":[],"passport.clients.*":[],"passport.scopes.*":[],"passport.personal.*":[],"passport.personal.tokens.*":[],"sanctum.*":[],"api.*":[],"api.user.*":[],"api.dashboard.*":[],"api.notif.*":[],"api.store.*":[],"api.store.event.*":[],"api.avatar.*":[],"api.settings.*":[],"maintenance.*":[],"maintenance.authenticate.*":[],"leaderboard.*":[],"my.*":[],"my.dashboard.*":[],"user.*":[],"user.settings.*":[],"avatar.*":[],"forum.*":[],"forum.create.*":[],"forum.reply.*":[],"chat.*":[],"auth.*":[],"auth.login.*":[],"auth.login.google.*":[],"auth.login.metamask.*":[],"auth.register.*":[],"auth.forgot.*":[],"games.*":[],"store.*":[],"store.create.*":[],"develop.*":[],"develop.create.*":[],"spaces.*":[],"admin.*":[],"admin.users.*":[],"admin.items.*":[],"admin.items.create.*":[]}}
}