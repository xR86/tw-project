/**
 * Created by alber_000 on 6/1/2016.
 */
var filter=require('./genericFilter');

function personFilter(req,res)
{
    var bindvariables= {
        case1:
        {
            p_id:req.body.p_id,
            tasks_completed_counter:req.body.tasks_completed_counter,
            date1:req.body.date1,
            date2:req.body.date2
        },
        case2:
        {
            p_id:req.body.p_id,
            date1:req.body.date1,
            date2:req.body.date2
        },
        case3:
        {
            tasks_completed_counter:req.body.tasks_completed_counter
        },
        case4:
        {
            date1:req.body.date1,
            date2:req.body.date2
        },
        case5:
        {
            p_id:req.body.p_id
        },
        case6:
        {
            tasks_completed_counter:req.body.tasks_completed_counter,
            date1:req.body.date1,
            date2:req.body.date2
        }
    };

    var select=[];

    if(req.body.p_id!='' && req.body.tasks_completed_counter!='' && req.body.date1!='' && req.body.date2!='')
    {
        select.push("SELECT * FROM personView where p_id= :p_id and tasks_completed_counter> :tasks_completed_counter and " +
            "TO_DATE(TRUNC(completeddate),'DD/MM/YY') between TO_DATE(:date1,'DD/MM/YY') and TO_DATE(:date2,'DD/MM/YY')");
        filter.filterBy(req,res,select[0],bindvariables.case1);
    }
    else if(req.body.p_id!='' && req.body.tasks_completed_counter=='' && req.body.date1!='' && req.body.date2!='')
    {
        select.push("SELECT * FROM personView where p_id= :p_id and " +
            "TO_DATE(TRUNC(completeddate),'DD/MM/YY') between TO_DATE(:date1,'DD/MM/YY') and TO_DATE(:date2,'DD/MM/YY')");
        filter.filterBy(req,res,select[0],bindvariables.case2);
    }
    else if(req.body.p_id=='' && req.body.tasks_completed_counter!='' && req.body.date1=='' && req.body.date1=='' && req.body.date2=='')
    {
        select.push("SELECT * FROM personView where tasks_completed_counter> :tasks_completed_counter");
        filter.filterBy(req,res,select[0],bindvariables.case3);
    }
    else if(req.body.p_id=='' && req.body.tasks_completed_counter=='' && req.body.date1=='' && req.body.date2=='' )
    {
        select.push("SELECT * FROM personView");
        console.log(select[0]);
        filter.filterBy(req, res, select[0], {});
    }
    else if(req.body.p_id=='' && req.body.tasks_completed_counter=='' && req.body.date1!='' && req.body.date2!='')
    {
        select.push("SELECT * FROM personView where TO_DATE(TRUNC(completeddate),'DD/MM/YY') between TO_DATE(:date1,'DD/MM/YY') and TO_DATE(:date2,'DD/MM/YY')");
        filter.filterBy(req,res,select[0],bindvariables.case4);
    }
    else if(req.body.p_id!='' && req.body.tasks_completed_counter=='' && req.body.date1=='' && req.body.date2=='')
    {
        select.push("select * from personView where p_id= :p_id")
        filter.filterBy(req,res,select[0],bindvariables.case5);
    }
    else if(req.body.p_id=='' && req.body.tasks_completed_counter!='' && req.body.date1!='' && req.body.date2!='')
    {
        select.push("SELECT * FROM personView where tasks_completed_counter> :tasks_completed_counter " +
            "TO_DATE(TRUNC(completeddate),'DD/MM/YY') between TO_DATE(:date1,'DD/MM/YY') and TO_DATE(:date2,'DD/MM/YY')");
        filter.filterBy(req,res,select[0],bindvariables.case2);
    }
    else
    {
        res.redirect('/datafiltering/personFilter');
        console.log("try inputting again");
    }
}

module.exports=personFilter;