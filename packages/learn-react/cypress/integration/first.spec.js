/// <reference types="Cypress" />
context('Window', () => {
    beforeEach(() => {
        cy.visit('http://www.dev.qa.nt.tripcorp.com/flightsorder/vieworder?orderid=31190882095', {
            "cookie": "_RGUID=660fc892-7a2f-4777-8572-a742657083b7; _RSG=tTqBw99oFO6tE8Sb9qfoL8; _RDG=28094f7d478eea2d52150e47f57c974d90; nfes_isSupportWebP=1; ibulocale=en_xx; ibu_online_home_redirect_record=false; ibu_online_home_redirect_from_last_visite=false; _ga=GA1.2.1273211630.1577951872; cookiePricesDisplayed=USD; cticket=106B44E8B07C1EA57B6C515CA69495B8A8C80F48B9AA07043F1D440D751A41D8; ticket_ctrip=6VZOa8KBwgxPu+r+VblSSkBptL4Jva7mRXWKKy9OU9R1JAMuDIy0opIqmGPGv/peKzF3RqLIje1pzElVwlNcpMmwIdDPGBWP4Pe3WauOtu8AF6brZdLHjBF05oqD1Jgr2t4C9Oiw91HMhQLh0pRxsG2hDgbrka6ERI3KTIlgCDSc4FkhradtJAk9daXW+lMV65COPGNZhshrqq60SRH2Q+8/TS1FNDNv0aznEBdj1VJGYkymoXmxvaedkxZ8LEmHCc9B4p/6OjzbIi6zmZw+e9zmCcf3C6LWDp6Rj1ERGsA=; DUID=u=0BD39978E20B29E8C78958E64F6D91A1&v=0; IsNonUser=F; ibu_h5_isquick=0; cticket=106B44E8B07C1EA57B6C515CA69495B8A8C80F48B9AA07043F1D440D751A41D8; ticket_ctrip=6VZOa8KBwgxPu+r+VblSSkBptL4Jva7mRXWKKy9OU9R1JAMuDIy0opIqmGPGv/peKzF3RqLIje1pzElVwlNcpMmwIdDPGBWP4Pe3WauOtu8AF6brZdLHjBF05oqD1Jgr2t4C9Oiw91HMhQLh0pRxsG2hDgbrka6ERI3KTIlgCDSc4FkhradtJAk9daXW+lMV65COPGNZhshrqq60SRH2Q+8/TS1FNDNv0aznEBdj1VJGYkymoXmxvaedkxZ8LEmHCc9B4p/6OjzbIi6zmZw+e9zmCcf3C6LWDp6Rj1ERGsA=; DUID=u=0BD39978E20B29E8C78958E64F6D91A1&v=0; IsNonUser=F; ibu_h5_isquick=0; nfes_isSupportWebP=1; IBU_TRANCE_LOG_P=35732823784; IBU_TRANCE_LOG_URL=/hotels/list?city=364&adults=1&children=0&checkin=2020-02-06&checkout=2020-02-10&currency=USD; _abtest_userid=293b4faa-3867-40c2-9b63-95b32552e0a1; hoteluuid=XLNAM2s8HDXZSkd0Tp; ibulanguage=en; _pd=%7B%22r%22%3A9338%2C%22d%22%3A36627%2C%22_d%22%3A27289%2C%22p%22%3A36678%2C%22_p%22%3A51%2C%22o%22%3A36685%2C%22_o%22%3A7%2C%22s%22%3A36686%2C%22_s%22%3A1%7D; _bfa=1.1577951872808.8dpmn.1.1578636406699.1578972191044.51.309; _bfs=1.1; _gid=GA1.2.958453329.1578972191; _RF1=61.152.150.149; _bfi=p1%3D10320667461%26p2%3D0%26v1%3D309%26v2%3D0"
        })
    })
    it('cy.window() - get the global window object', () => {
        // https://on.cypress.io/window
        cy.window().should('have.property', 'top')
    })

    it('cy.document() - get the document object', () => {
        // https://on.cypress.io/document
        cy.document().should('have.property', 'charset').and('eq', 'UTF-8')
    })

    it('cy.title() - get the title', () => {
        // https://on.cypress.io/title
        cy.title().should('include', 'Kitchen Sink')
    })
})