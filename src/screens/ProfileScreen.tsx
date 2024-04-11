
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, Animated, PanResponder, TouchableOpacity, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { fetchUserProfile } from '../slices/profileSlice';
import { removeTweet } from '../slices/tweetSlice';
import notifee, { AndroidImportance } from '@notifee/react-native';
import useAuthStore from '../store/authStore'; 

const ProfileScreen: React.FC = () => {
  const dispatch = useDispatch();
  const userProfile = useSelector((state: RootState) => state.profile.userProfile);
  const userPosts = useSelector((state: RootState) => state.tweets.tweets.filter((tweet: { userId: number; }) => tweet.userId === 0));
  const { clearAuthToken } = useAuthStore();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [isProfileImageEnlarged, setIsProfileImageEnlarged] = useState(false);
  const [pan] = useState(new Animated.ValueXY());
useEffect(() => {
    dispatch(fetchUserProfile());
    fadeIn();
  }, [dispatch]);

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };
  const handlePanResponderRelease = () => {
    setIsProfileImageEnlarged(false);
    Animated.spring(pan, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: true,
    }).start();
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        setIsProfileImageEnlarged(true);
      },
      onPanResponderMove: Animated.event(
        [null, { dx: pan.x, dy: pan.y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: () => handlePanResponderRelease(),
      onPanResponderTerminate: () => handlePanResponderRelease(),
    })
  ).current;

  const handleDeleteTweet = (tweetId: number) => {
    dispatch(removeTweet(tweetId));
    sendTweetDeletedNotification();
  };
  const sendTweetDeletedNotification = async () => {
    try {
      await notifee.requestPermission();
      const channelId = await notifee.createChannel({
        id: 'deleted',
        name: 'Tweet Deleted',
        vibration: true,
        vibrationPattern: [400, 2000],
        sound: 'hollow',
      });

      await notifee.displayNotification({ 
        title: 'Tweet Deleted',
        body: 'Your tweet has been successfully deleted.',
    
      android: {
          channelId,
          vibrationPattern: [400, 2000],
          pressAction: {
            id: 'deleted',
          },
        }
      });
    } catch (error) {
      console.error('Error displaying notification:', error);
    }
  };
  const animatedStyle = {
    transform: [
      { translateX: pan.x },
      { translateY: pan.y },
      { scale: isProfileImageEnlarged ? 1.5 : 1 },
    ],
  };

  const handleLogout = () => {
    clearAuthToken();
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.profileInfoContainer}>
        <Animated.Image
          source={{ uri: userProfile.profileImageUrl }}
          style={[styles.profileImage, isProfileImageEnlarged && styles.enlargedProfileImage, animatedStyle]}
          {...panResponder.panHandlers}
        />
        <View style={styles.userInfo}>
          <Text style={styles.username}>{userProfile.username}</Text>
          <View style={styles.followContainer}>
            <Text style={styles.followText}>Followers: {userProfile.followersCount}</Text>
            <Text style={styles.followText}>Following: {userProfile.followingCount}</Text>
          </View>
        </View>
      </View>
      <Text style={styles.sectionTitle}>User Posts</Text>
      <FlatList
        data={userPosts}
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
            <Text style={styles.postContent}>{item.content}</Text>
            <TouchableOpacity onPress={() => handleDeleteTweet(item.id)} style={styles.deleteButton}>
              <Text style={styles.deleteButtonText}>Delete Tweet</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <Button title="Log Out" onPress={handleLogout} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  profileInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
  },
  enlargedProfileImage: {
    position: 'absolute',
    zIndex: 1,
    width: 160,
    height: 160,
    top: 50,
    left: 20,
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  followContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  followText: {
    fontSize: 16,
    color: '#666666',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    marginTop: 20,
  },
  postContainer: {
    position: 'relative',
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
  },
  postContent: {
    fontSize: 16,
  },
  deleteButton: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
  deleteButtonText: {
    color: 'red',
  },
});

export default ProfileScreen;
