import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import moment from 'moment'
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import YouTubeIcon from '@material-ui/icons/YouTube';


import { connect } from 'react-redux';
import * as actions from '../store/actions'

class CongressMember extends Component {

    state = { 
        memberInfo: {},
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
            fetchedItems = r.data.results[0]
            console.log(fetchedItems)
            if (r.data.results.length > 0) {

                this.setState({memberInfo: fetchedItems, loading: false })
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
        const { loading, selectedRoles, memberInfo } = this.state
        const member = this.props.members.find(m => m.id === this.props.match.params.id)
        // const { members } = this.props
        const loading2= <p>Loading...</p>
        const details = memberInfo.roles ? memberInfo.roles.map((role, idx) => 
                                <li key={idx} onClick={() => this.handleRoles(idx)}>{role.chamber+', '+role.state+', '+moment(role.start_date).format('YYYY')+', '+(role.party=='D' ? 'Democrat' : 'Republican')}
                                <ul hidden={!selectedRoles.includes(idx)}>
                                    {role.committees ? role.committees.map((cm, idx) => <li key={idx}>{cm.name} ({cm.begin_date+' - '+cm.end_date})</li>) : null}
                              </ul></li>) : ''

        const card = member ? <div className="card">
                        <h1>{member.first_name+' '+member.last_name} {member.facebook_account ? <a target='_blank' href={'https://www.facebook.com/'+member.facebook_account}><FacebookIcon fontSize='large' color='primary' /></a> : null}
                    
                        {member.twitter_account ? <a target='_blank' href={'https://www.twitter.com/'+member.twitter_account}><TwitterIcon fontSize='large'/></a> : null}
                        {member.youtube_account ? <a target='_blank' href={'https://www.youtube.com/'+member.youtube_account}><YouTubeIcon fontSize='large' color='error'/></a> : null} </h1>
                        <h3>{member.party+'-'+member.state}</h3>
                        <p>Office: {member.office}<br />
                        Phone: {member.phone}</p>
                        <p>Birth Date: {member.date_of_birth}</p>
                        <p>Total Votes: {member.total_votes}</p>
                        
                        Roles:
                        <ul>
                        {!loading ? details : 'Loading...'}
                        
                        </ul>
                        
                        <p><a href={member.url} target='_blank'><button>Contact</button></a></p>
                    </div> : null
        return (
            <div className='container'>
                <Link to='/'><button>Back</button></Link>
                <br />
                {card}
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        members: state.data.members,
        loading: state.data.loading,
    }
  }

export default connect(mapStateToProps)(CongressMember)
