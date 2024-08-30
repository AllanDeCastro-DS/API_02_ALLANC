//1 requirewss
const exports = require('express')
const mysql2 = require('mysql2')
const cors = require('cors')

const mysql_config = require('./inc/mysql_config')
const functions = require('./inc/function')

//2 criação de duas constantes para a verificação da disponibilidade da api e tambem da versão da API

const API_AVAILABILITY=true
const  API_VERSION='1.0.0'

//2iniciar o server
const app = exports()
app.listen(3000,()=>{
    console.log('API executando')
})

//4 checar se o API esta disponivel
app.use((res,res,next)=>{
    if(API_AVAILABILITY){
        next();
    }else{
        res.json(functions.response('atenção','API esta em manutenção. Sinto muito',0,null))
    }
})

//5mysql_conection
const connection=mysql.createConection(mysql_config)

//6 cors
app.use(cors())

//7 rotas
//rota inicial que vai dizer que a API esta disponivel
app.get('./',()=>{
    res.json(functions.response('sucesso','API esta rodando',0,null))
}) 

//9 rota para pegar todas as tarefas
app.get('/tasks',(req,res)=>{
    connection.querry('SELECT * FROM tasks',(err,rows))
})


//10 rota para pegar a task pelo id
app.get('/tasks/:id',(req,res)=>{
    const id=req.params.id
    connection.querry('SELECT * FROM tasks WHERE id=?'[id],(err,rows)=>{
        if(err){
            //devolver os dados da task
            if(rows.lenght>0){
                res.json(functions.response('sucesso','Sucesso na pesquisa',rows.lenght,rows))
            }
            else{
                res.json(functions.response('Atenção','Não foi possivel encontrar a task solicitada',0,rows))
            }
        
        }
        else{
            res.json(functions.response('error',err.message,0,null))
        }
        })
})

//11 atualizar o status de uma task .metodo put

app.put('/tasks/:id/status/status',(req,res)=>{
    const id=req.params.id;
    const status=req.params.status
    connection.querry('UPDATE tasks SET status =? WHERE id =?',(status,id),(err,rows)=>{
        if(!err){
            if(rows.affectedRows>0){
                res.json(functions.response('sucesso','sucesso na lateração do status',rows.affectedRows,null))
            }
            else{
                res.json(functions.response('atenção','task não encontrada',0,null))
            }

        }
        else{
            res.json(functions.response('Erro',err.message,0,null))
        }
    })
})

//8 midlaware para caso alguma rota não  sejas encontrada 
app.use((req,res)=>{
    
    res.json(functions.response('atenção','Rota não encontrada',0,null))
})