import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginResponse } from './dto/login-response';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { SignUpUserInput } from './dto/signup-user.input';
import { LoginUserInput } from './dto/login-user.input';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginResponse) 
  @UseGuards(GqlAuthGuard)
  login(@Args('loginUserInput') loginUserInput: LoginUserInput, @Context() context) {
    return this.authService.login(context.user);
  }

  @Mutation(() => LoginResponse) 
  signup(@Args('signupUserInput') signupUserInput: SignUpUserInput) {
    return this.authService.signup(signupUserInput);
  }

  @Query(() => Boolean, { name: 'logOut' }) 
  @UseGuards(JwtAuthGuard)
  logOut() {
    return true;
  }
}
