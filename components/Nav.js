import React from 'react';
import styled from 'styled-components';
import { rgba } from 'polished';
import Link from 'next/link';
import Search from 'components/Search';

const Navbar = styled.nav`
  width: 100%;
  height: 66px;
  background-color: ${props => props.theme.navBackground};
  border-bottom: 1px solid ${props => props.theme.navBottomOutline};
  display: flex;
  align-items: center;
`;

const Title = styled.a`
  color: ${props => props.theme.title};
  font-size: 1.5em;
  font-weight: 700;
  text-transform: uppercase;
  padding-left: 25px;
`;

const StyledLink = styled.a`
  padding-left: 10px;
  padding-right: 10px;
  font-size: 14px;
  letter-spacing: 2px;
  text-transform: uppercase;
  transition: color 200ms ease, opacity 200ms ease;

  &:hover {
    color: ${props => rgba(props.theme.navLinkHover, 0.7)};
  }
`;

const LinkContainer = styled.div`
  padding-left: 10px;
`;

const UserStatus = styled(StyledLink)`
  display: flex;
  justify-content: flex-end;
  margin-right: 10px;
`;

const Rightside = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-items: center;
`;

const SiteLinks = [{ text: 'Browse', href: '/browse' }];

const NavLink = link => (
  <Link href={link.href} key={link.href} passHref>
    <StyledLink>{link.text}</StyledLink>
  </Link>
);

const Nav = props => {
  return (
    <Navbar>
      <Title href={props.site._links.home_page.href}>{props.site.title}</Title>
      <LinkContainer>{SiteLinks.map(NavLink)}</LinkContainer>
      <Rightside>
        <Search />
        <UserStatus href={`${props.site._links.home_page.href}/buy`}>Start free trial</UserStatus>
      </Rightside>
    </Navbar>
  );
};

export default Nav;
