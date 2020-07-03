const connection = require('../database/connection');

module.exports = {
    async create (req, res){
        const { title, description, value } = req.body;

        const ong_id = req.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        });

        return res.json({ id });
    },

    async update (req, res){
        const { id } = req.params;
        const { title, description, value } = req.body;

        const ong_id = req.headers.authorization;
        try{
            const result = await  connection('incidents').where({
                id
            }).select('ong_id')
            .first();
    
            if(result.ong_id != ong_id){
                return res.status(401).json({ error: 'Operation not permitted.'});
            }else{
                const ok = await connection('incidents').where({
                    id
                }).update({
                    title,
                    description,
                    value
                });
    
                return res.status(204).send();
            }
        }
        catch(err){
            console.log(err);
            return resp.status(400).json({ error: 'Operation error.'});
        }
    },

    async index (req, resp){
        const { page = 1 } = req.query;

        const [ count ] = await connection('incidents').count();

        resp.header('X-Total-Count', count['count(*)']);

        const incidentes = await  connection('incidents')
            .innerJoin('ongs', 'ongs.id', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'incidents.*',
                { 'ong_name': 'ongs.name'},
                { 'ong_email': 'ongs.email'},
                { 'ong_whatsapp': 'ongs.whatsapp'},
                { 'ong_uf': 'ongs.uf'},
                { 'ong_city': 'ongs.city'}
            ]);
 
        return resp.json(incidentes);
    },

    async delete (req, resp){
        const { id } = req.params;

        const ong_id = req.headers.authorization;

        const result = await  connection('incidents').where({
            id
        }).select('ong_id')
        .first();

        if(result.ong_id != ong_id){
            return resp.status(401).json({ error: 'Operation not permitted.'});
        }else{
            const ok = await connection('incidents').where({
                id
            }).delete();

            console.log(ok);
            return resp.status(204).send();
        }
    },

    async get (req, resp){
        const { id } = req.params;
        const ong_id = req.headers.authorization;

        const result = await  connection('incidents').where({
            id
        }).first();

        console.log(id);
        console.log(ong_id);
        console.log(result);
 
        return resp.json(result);
    },
}; 