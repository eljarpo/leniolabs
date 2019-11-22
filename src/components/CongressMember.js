import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import moment from 'moment'
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import YouTubeIcon from '@material-ui/icons/YouTube';

export default class CongressMember extends Component {

    state = { 
        member: {},
        loading: true,
        selectedRoles: [0]
    }
    componentDidMount () {
        this.fetchMember(this.props.match.params.id)
      }
      fetchMember = (id) => {

        axios.get("https://api.propublica.org/congress/v1/members/"+id+".json", { 'headers': { 'X-API-Key': '5og6CCG0fxLBhSoanWGSMFsr7FDIs609Mvrg8r6n' } })
        .then((r => {
            let fetchedItems = [];
            // for (let key in r.data.results[0]) {
            //     console.log(key, r.data.results[0][key])
            //     fetchedItems.push({...r.data.results[0][key], id: key});
            // }
            fetchedItems = r.data.results[0]
            console.log(fetchedItems)
            if (r.data.results.length > 0) {

                this.setState({member: fetchedItems, loading: false })
            }
        }))

    }
    handleRoles = (id) => {
        
        let newRoles = this.state.selectedRoles
        if (this.state.selectedRoles.includes(id)) {
            newRoles = newRoles.filter(i => i!==id)
        } else {
            newRoles.push(id)
        }
        this.setState({selectedRoles: newRoles})
    }
    render() {
        const { member, loading, selectedRoles } = this.state
        const details = <div className="card">
                            
                            <h1>{member.first_name+' '+member.last_name} {member.facebook_account ? <a target='_blank' href={'https://www.facebook.com/'+member.facebook_account}><FacebookIcon fontSize='large' color='primary' /></a> : null}
                           
                            {member.twitter_account ? <a target='_blank' href={'https://www.twitter.com/'+member.twitter_account}><TwitterIcon fontSize='large'/></a> : null}
                            {member.youtube_account ? <a target='_blank' href={'https://www.youtube.com/'+member.youtube_account}><YouTubeIcon fontSize='large' color='error'/></a> : null} </h1>
                             
                            <p>Birth Date: {member.date_of_birth}</p>
                            <p>Last Vote: {member.most_recent_vote}</p>
                            
                            Roles:
                            <ul>
                            {member.roles ? member.roles.map((role, idx) => 
                                <li key={idx} onClick={() => this.handleRoles(idx)}>{role.chamber+', '+role.state+', '+moment(role.start_date).format('YYYY')+', '+(role.party=='D' ? 'Democrat' : 'Republican')}
                                <ul hidden={!selectedRoles.includes(idx)}>
                                    {role.committees ? role.committees.map((cm, idx) => <li key={idx}>{cm.name} ({cm.begin_date+' - '+cm.end_date})</li>) : null}
                              </ul></li>) : ''}
                            
                            </ul>
                            
                            <p><a href={member.url} target='_blank'><button>Contact</button></a></p>
                        </div>
        return (
            <div className='container'>
                <Link to='/'><button>Back</button></Link>
                <br />
                {loading ? 'Loading...' : details}
                
            </div>
        )
    }
}
