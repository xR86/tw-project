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
            tasks_completed_counter:req.body.tasks_completed_counter
            // date1:req.body.date1 -->futere filter
            //  date2:req.body.date2 --> futere filter
            // task_name -->futere filter maybe
        },
        case2:
        {
            p_id:req.body.p_id
        },
        case3:
        {
            tasks_completed_counter:req.body.tasks_completed_counter
        }
    };

    var select=[];

    if(req.body.p_id!='' && req.body.tasks_completed_counter!='')
    {
        select.push("SELECT * FROM personView where p_id= :p_id and tasks_completed_counter> :tasks_completed_counter");
        filter.filterBy(req,res,select[0],bindvariables.case1);
    }
    else if(req.body.p_id!='' && req.body.tasks_completed_counter=='')
    {
        select.push("SELECT * FROM personView where p_id= :p_id");
        filter.filterBy(req,res,select[0],bindvariables.case2);
    }
    else if(req.body.p_id=='' && req.body.tasks_completed_counter!='')
    {
        select.push("SELECT * FROM personView where tasks_completed_counter> :tasks_completed_counter");
        filter.filterBy(req,res,select[0],bindvariables.case3);
    }
    else if(req.body.p_id=='' && req.body.tasks_completed_counter=='')
    {
        select.push("SELECT * FROM personView");
        console.log(select[0]);
        filter.filterBy(req,res,select[0],{});
    }
    else
    {
        res.redirect('/datafiltering/personFilter');
        console.log("try inputting again");
    }
}

module.exports=personFilter;