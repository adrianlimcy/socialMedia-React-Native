import React from 'react';
import { Button, FlatList, Text, View, ScrollView, RefreshControl } from 'react-native';
import styled from 'styled-components/native';
import { GET_POSTS } from '../constants';
import PostItem from '../Components/Post/PostItem';
import { useQuery } from '@apollo/react-hooks';

const PostsWrapper = styled(View)`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;

const PostsList = styled(FlatList)`
  width: 100%;
`;

const PostsText = styled(Text)`
  font-size: 20px;
  color: black;
`;

const Posts = ({ navigation }) => {
  const { loading, data, refetch } = useQuery(GET_POSTS, {pollInterval: 0});
  const [refreshing, setRefreshing] = React.useState(false)

  const handleRefresh = (refetch) => {
    setRefreshing(true)
    refetch().then(()=>setRefreshing(false))
  }

  return (
    <PostsWrapper>
      {loading && !refreshing ? (
        <PostsText>{loading ? 'Loading...' : 'Empty'}</PostsText>
      ) : (
        <ScrollView
          style={{width: '100%'}}
          refreshControl={
            <RefreshControl 
              refreshing={refreshing}
              onRefresh={()=>handleRefresh(refetch)}
            
            />
          }        
        >
          <PostsList
          data={data.posts}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <PostItem item={item} navigation={navigation} />
          )}
        />
        </ScrollView>
      )}
    </PostsWrapper>
  );
};

Posts.navigationOptions = ({navigation}) => ({
  headerRight: (
    <Button onPress={() => navigation.navigate('AddPost')} title='Add Post' />
  )
})

export default Posts;
