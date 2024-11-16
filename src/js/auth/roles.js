const Admin = 'Admin'
const User = ' User'
const Superuser = 'Superuser'
const WorkPackeage_Viewer_Only = 'WorkPackeage_Viewer_Only'
const  HeadersOnV_Viewer_Only = 'HeadersOnV_Viewer_Only'

const ImportDataRole = ['Admin','User','Superuser']
const HeadersOnRole =['Admin','User','Superuser']
const WorkPackageRole = ['Admin','User','Superuser','WorkPackeage_Viewer_Only','HeadersOnV_Viewer_Only']
const SettingsRole =['Admin']
const AccessAll = ['Admin','User','Superuser','WorkPackeage_Viewer_Only','HeadersOnV_Viewer_Only']

export default {
    Admin,
    User,
    Superuser,
    WorkPackeage_Viewer_Only,
    HeadersOnV_Viewer_Only,
    ImportDataRole,
    HeadersOnRole,
    WorkPackageRole,
    SettingsRole,
    AccessAll
}