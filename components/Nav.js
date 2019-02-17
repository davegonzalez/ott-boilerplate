import React from 'react';
import styled from 'styled-components';
import { rgba } from 'polished';

const Navbar = styled.nav`
  width: 100%;
  height: 66px;
  background-color: ${props => props.theme.navBackground};
  border-bottom: 1px solid ${props => props.theme.navBottomOutline};
  display: flex;
  align-items: center;
`;

// TODO: Turn into href/link?
const Title = styled.div`
  color: ${props => props.theme.title};
  font-size: 1.5em;
  font-weight: 700;
  text-transform: uppercase;
  padding-left: 25px;
`;

const NavLink = styled.a`
  padding-left: 10px;
  padding-right: 10px;
  font-size: 14px;
  letter-spacing: 2px;
  text-transform: uppercase;
  transition: color 200ms ease, opacity 200ms ease;
  flex: 1;

  &:hover {
    color: ${props => rgba(props.theme.navLinkHover, 0.7)};
  }
`;

const LinkContainer = styled.div`
  padding-left: 10px;
`;

const UserStatus = styled(NavLink)`
  display: flex;
  justify-content: flex-end;
  margin-right: 10px;
`;

const SiteLinks = [{ text: 'Browse', href: '/browse' }, { text: 'Search', href: '/search' }];
const Link = link => <NavLink href={link.href}>{link.text}</NavLink>;

const Nav = props => {
  return (
    <Navbar>
      <Title>{props.site.title}</Title>
      <LinkContainer>{SiteLinks.map(Link)}</LinkContainer>
      <UserStatus>Start free trial</UserStatus>
    </Navbar>
  );
};

export default Nav;
