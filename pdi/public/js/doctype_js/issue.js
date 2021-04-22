frappe.ui.form.on('Issue', {
    status: function(frm){
        if(frm.doc.status=="Closed"){
            frm.set_value("escalation_counter",Math.min(frm.doc.escalation_counter+1,3))
        }
    },
    service: function(frm){
        if(frm.doc.primary_location && frm.doc.secondary_location && frm.doc.service){
            frappe.call({
                'method': "pdi.api.get_engineer_detail",
                'args':{
                    'primary_location': frm.doc.primary_location,
                    'secondary_location': frm.doc.secondary_location,
                    'service': frm.doc.service
                },
                callback: function(r){
                    if(r.message[0]){
                        frm.set_value('engineer_name',r.message[0].full_name)
                        frm.set_value('contact_email',r.message[0].user)
                        frm.set_value('mobile_number',r.message[0].phone)
                        frm.set_value('contractor',r.message[0].contractor)
                    }
                    else{
                        frm.set_value('engineer_name','')
                        frm.set_value('contact_email','')
                        frm.set_value('mobile_number','')
                    }
                }
            })
        }
    }
});